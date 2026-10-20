[CmdletBinding()]
param([ValidateRange(1024,65535)][int]$Port=8000,[string]$InterfaceAlias,[switch]$NoBrowser,[switch]$LocalOnly)
$ErrorActionPreference='Stop'
function Is-PrivateIPv4([string]$address) {
    $bytes=([Net.IPAddress]::Parse($address)).GetAddressBytes()
    return $bytes.Length -eq 4 -and ($bytes[0] -eq 10 -or ($bytes[0] -eq 172 -and $bytes[1] -ge 16 -and $bytes[1] -le 31) -or ($bytes[0] -eq 192 -and $bytes[1] -eq 168))
}
$networks=@(foreach($adapter in [Net.NetworkInformation.NetworkInterface]::GetAllNetworkInterfaces()) {
    if($adapter.OperationalStatus -ne 'Up' -or $adapter.NetworkInterfaceType -eq 'Loopback'){continue}
    $properties=$adapter.GetIPProperties()
    foreach($unicast in $properties.UnicastAddresses) {
        if($unicast.Address.AddressFamily -eq [Net.Sockets.AddressFamily]::InterNetwork -and (Is-PrivateIPv4 $unicast.Address.IPAddressToString)) {
            [PSCustomObject]@{Name=$adapter.Name;IP=$unicast.Address.IPAddressToString;Gateway=@($properties.GatewayAddresses | Where-Object {$_.Address.AddressFamily -eq [Net.Sockets.AddressFamily]::InterNetwork}).Count -gt 0}
        }
    }
})
$selected=$null
if(!$LocalOnly) {
    $candidates=@($networks | Where-Object {if($InterfaceAlias){$_.Name -eq $InterfaceAlias}else{$_.Gateway}})
    if($candidates.Count -ne 1) {
        Write-Host 'Interfaces IPv4 privadas disponibles:'
        $networks | Format-Table Name,IP,Gateway | Out-Host
        throw 'No se pudo elegir una unica interfaz. Usa -InterfaceAlias "Wi-Fi" o -LocalOnly.'
    }
    $selected=$candidates[0]
}
$listeners=New-Object 'System.Collections.Generic.List[Net.Sockets.TcpListener]'
$publicRoot=$null
try {
    # Reserva el puerto antes de regenerar. No cambia de puerto ni mata otros procesos.
    $binds=@('127.0.0.1');if($selected){$binds+= $selected.IP}
    foreach($bind in $binds){
        $listener=New-Object Net.Sockets.TcpListener([Net.IPAddress]::Parse($bind),$Port)
        $listener.Server.ExclusiveAddressUse=$true
        try{$listener.Start()}catch{throw "El puerto $Port esta ocupado o no se puede enlazar en $bind. No se ha cambiado el puerto. Cierra el servidor anterior o elige -Port conscientemente."}
        $listeners.Add($listener)
    }
    $publicRoot=(& (Join-Path $PSScriptRoot 'Preparar_Publicacion.ps1'))
    $rootPrefix=[IO.Path]::GetFullPath($publicRoot)+[IO.Path]::DirectorySeparatorChar
    Write-Host ''
    Write-Host 'DEATHSLEEP - PORTAL DE JUGADORES'
    Write-Host "Servidor iniciado. En esta computadora: http://localhost:$Port/"
    if($selected){
        Write-Host "Desde telefonos en la misma red: http://$($selected.IP):$Port/"
        Write-Host "Interfaz: $($selected.Name)"
        try{
            $profile=Get-NetConnectionProfile -InterfaceAlias $selected.Name -ErrorAction Stop
            Write-Host "Perfil de Windows: $($profile.NetworkCategory)"
            if($profile.NetworkCategory -ne 'Private'){Write-Warning 'La conexion no figura como Privada. Revisa README_SERVIDOR_LOCAL.md si el firewall bloquea los telefonos. No se han cambiado reglas ni el perfil.'}
        }catch{Write-Warning 'No se pudo consultar el perfil de Windows. Comprueba que tu red de confianza sea Privada.'}
    }else{Write-Host 'Modo LocalOnly: no acepta conexiones LAN.'}
    Write-Host 'Solo se sirve .public-jugadores. Elarion y material privado estan excluidos.'
    Write-Host 'Presiona Ctrl+C para detener. Conserva esta ventana durante la partida.'
    if(!$NoBrowser){Start-Process -FilePath "http://localhost:$Port/"}
    $types=@{'.html'='text/html; charset=utf-8';'.css'='text/css; charset=utf-8';'.js'='text/javascript; charset=utf-8';'.png'='image/png';'.jpg'='image/jpeg';'.jpeg'='image/jpeg';'.webp'='image/webp';'.svg'='image/svg+xml';'.ico'='image/x-icon';'.woff'='font/woff';'.woff2'='font/woff2';'.ttf'='font/ttf'}
    while($true){
        $handled=$false
        foreach($listener in $listeners){
            if(!$listener.Pending()){continue};$handled=$true
            $client=$listener.AcceptTcpClient();$file=$null
            try{
                $client.ReceiveTimeout=3000;$client.SendTimeout=5000
                $peer=([Net.IPEndPoint]$client.Client.RemoteEndPoint).Address
                if(![Net.IPAddress]::IsLoopback($peer) -and !(Is-PrivateIPv4 $peer.IPAddressToString)){continue}
                $stream=$client.GetStream()
                # Lee como maximo 16 KiB y termina ante clientes incompletos/lentos.
                $header=New-Object 'System.Collections.Generic.List[byte]'
                while($header.Count -lt 16384){$b=$stream.ReadByte();if($b -lt 0){break};$header.Add([byte]$b);$n=$header.Count;if($n -ge 4 -and $header[$n-4] -eq 13 -and $header[$n-3] -eq 10 -and $header[$n-2] -eq 13 -and $header[$n-1] -eq 10){break}}
                $request=[Text.Encoding]::ASCII.GetString($header.ToArray())
                $parts=($request -split "`r`n")[0] -split ' '
                $method=$parts[0];$status='200 OK';$mime='text/plain; charset=utf-8';$data=$null
                if($header.Count -ge 16384 -or $parts.Count -ne 3 -or $parts[2] -notmatch '^HTTP/1\.[01]$'){$status='400 Bad Request'}
                elseif($method -notin @('GET','HEAD')){$status='405 Method Not Allowed'}
                else{
                    $raw=($parts[1] -split '\?')[0]
                    $relative=[Uri]::UnescapeDataString($raw)
                    if(!$relative.StartsWith('/') -or $relative.StartsWith('//') -or $relative -match '[\\:%\x00-\x1f]' -or $relative -match '(^|/)\.'){$status='403 Forbidden'}
                    else{
                        $relative=$relative.TrimStart('/');if(!$relative -or $relative.EndsWith('/')){$relative+='index.html'}
                        $target=[IO.Path]::GetFullPath((Join-Path $publicRoot $relative))
                        if(!$target.StartsWith($rootPrefix,[StringComparison]::OrdinalIgnoreCase)){$status='403 Forbidden'}
                        elseif(!(Test-Path -LiteralPath $target -PathType Leaf)){$status='404 Not Found'}
                        elseif(!$types.ContainsKey([IO.Path]::GetExtension($target).ToLowerInvariant())){$status='403 Forbidden'}
                        elseif((Get-Item -LiteralPath $target).Attributes -band [IO.FileAttributes]::ReparsePoint){$status='403 Forbidden'}
                        else{$file=[IO.File]::OpenRead($target);$mime=$types[[IO.Path]::GetExtension($target).ToLowerInvariant()]}
                    }
                }
                if($null -eq $file){$data=[Text.Encoding]::UTF8.GetBytes($status);$count=$data.Length}else{$count=$file.Length}
                $headers="HTTP/1.1 $status`r`nContent-Type: $mime`r`nContent-Length: $count`r`nConnection: close`r`nCache-Control: no-cache`r`nX-Content-Type-Options: nosniff`r`nReferrer-Policy: same-origin`r`n"
                if($status -like '405*'){$headers+="Allow: GET, HEAD`r`n"}
                $bytes=[Text.Encoding]::ASCII.GetBytes($headers+"`r`n");$stream.Write($bytes,0,$bytes.Length)
                if($method -ne 'HEAD'){if($file){$file.CopyTo($stream,65536)}else{$stream.Write($data,0,$data.Length)}}
            }catch{Write-Verbose $_}
            finally{if($file){$file.Dispose()};$client.Close()}
        }
        if(!$handled){[Threading.Thread]::Sleep(10)}
    }
}catch{Write-Error $_;exit 1}
finally{foreach($listener in $listeners){$listener.Stop()};Write-Host 'Servidor detenido.'}
