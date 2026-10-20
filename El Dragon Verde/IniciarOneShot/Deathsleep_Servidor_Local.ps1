param([int]$Port = 8765, [switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath($PSScriptRoot) + [IO.Path]::DirectorySeparatorChar
$listener = New-Object Net.Sockets.TcpListener([Net.IPAddress]::Loopback, $Port)
try { $listener.Start() } catch {
    Write-Host "No se pudo iniciar 127.0.0.1:$Port. Cierra otro servidor Deathsleep o usa -Port con otro puerto."
    exit 1
}
$base = "http://127.0.0.1:$Port/"
$pages = @('Deathsleep_Banda_Sonora_Panel_DM.html', 'Deathsleep_Escaleta_Integral_DM.html')
Write-Host 'DEATHSLEEP - Servidor local. Cierra esta ventana para detenerlo.'
foreach ($page in $pages) { Write-Host ($base + $page) }
Write-Host 'Solo acepta conexiones de este equipo. No publica nada en Internet.'
if (!$NoBrowser) {
    $opera = Join-Path $env:LOCALAPPDATA 'Programs\Opera\opera.exe'
    foreach ($page in $pages) {
        if (Test-Path -LiteralPath $opera) { Start-Process -FilePath $opera -ArgumentList ($base + $page) }
        else { Start-Process ($base + $page) }
    }
}
$types = @{'.html'='text/html; charset=utf-8'; '.js'='text/javascript; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.webp'='image/webp'; '.svg'='image/svg+xml'; '.pdf'='application/pdf'; '.ico'='image/x-icon'; '.txt'='text/plain; charset=utf-8'}
try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        try {
            $client.ReceiveTimeout = 3000
            $stream = $client.GetStream()
            $reader = New-Object IO.StreamReader($stream, [Text.Encoding]::ASCII, $false, 1024, $true)
            $line = $reader.ReadLine()
            if (!$line) { continue }
            $parts = $line.Split(' ')
            $method = $parts[0]
            $headers = @{}
            while ($line = $reader.ReadLine()) {
                $colon = $line.IndexOf(':')
                if ($colon -gt 0) { $headers[$line.Substring(0,$colon).ToLowerInvariant()] = $line.Substring($colon+1).Trim() }
            }
            $status = '200 OK'; $file = $null; $data = $null; $first = 0L; $last = 0L
            $type = 'text/plain; charset=utf-8'; $extra = ''
            $relative = [Uri]::UnescapeDataString(($parts[1] -split '\?')[0]).TrimStart('/').Replace('/', [IO.Path]::DirectorySeparatorChar)
            if (!$relative) { $relative = $pages[0] }
            $target = [IO.Path]::GetFullPath((Join-Path $root $relative))
            if ($method -notin @('GET','HEAD')) { $status = '405 Method Not Allowed' }
            elseif (!$target.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -or $relative -match '(^|[\\/])\.') { $status = '403 Forbidden' }
            elseif (!(Test-Path -LiteralPath $target -PathType Leaf)) { $status = '404 Not Found' }
            else {
                $file = [IO.File]::OpenRead($target)
                $length = $file.Length; $last = $length - 1
                $ext = [IO.Path]::GetExtension($target).ToLowerInvariant()
                if ($types.ContainsKey($ext)) { $type = $types[$ext] } else { $type = 'application/octet-stream' }
                $extra = "Accept-Ranges: bytes`r`n"
                if ($headers['range'] -match '^bytes=(\d*)-(\d*)$' -and ($Matches[1] -or $Matches[2])) {
                    if ($Matches[1]) {
                        $first = [long]$Matches[1]
                        if ($Matches[2]) { $last = [Math]::Min([long]$Matches[2], $last) }
                    } else { $first = [Math]::Max(0, $length - [long]$Matches[2]) }
                    if ($first -gt $last) { $status = '416 Range Not Satisfiable'; $extra += "Content-Range: bytes */$length`r`n"; $file.Dispose(); $file = $null }
                    else { $status = '206 Partial Content'; $extra += "Content-Range: bytes $first-$last/$length`r`n" }
                }
            }
            if ($null -eq $file) { $data = [Text.Encoding]::UTF8.GetBytes($status); $count = $data.Length }
            else { $count = [Math]::Max(0, $last - $first + 1) }
            $head = [Text.Encoding]::ASCII.GetBytes("HTTP/1.1 $status`r`nContent-Type: $type`r`nContent-Length: $count`r`nConnection: close`r`nReferrer-Policy: strict-origin-when-cross-origin`r`n$extra`r`n")
            $stream.Write($head, 0, $head.Length)
            if ($method -eq 'GET') {
                if ($null -ne $file) {
                    $null = $file.Seek($first, [IO.SeekOrigin]::Begin)
                    $buffer = New-Object byte[] 65536
                    while ($count -gt 0) {
                        $read = $file.Read($buffer, 0, [int][Math]::Min($buffer.Length, $count))
                        if ($read -eq 0) { break }
                        $stream.Write($buffer, 0, $read); $count -= $read
                    }
                } else { $stream.Write($data, 0, $data.Length) }
            }
        } catch { Write-Verbose $_ }
        finally { if ($null -ne $file) { $file.Dispose() }; $client.Close() }
    }
} finally { $listener.Stop() }
