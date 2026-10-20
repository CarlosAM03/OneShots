# Windows PowerShell 5.1 y PowerShell 7. Sin dependencias externas.
[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
$sourceRoot = [IO.Path]::GetFullPath($PSScriptRoot)
$publicRoot = Join-Path $sourceRoot '.public-jugadores'
$buildRoot = Join-Path $sourceRoot ('.public-build-' + [Guid]::NewGuid().ToString('N'))
$marker = '.deathsleep-public.json'
if ((Test-Path -LiteralPath $publicRoot) -and !(Test-Path -LiteralPath (Join-Path $publicRoot $marker))) { throw 'La carpeta publica ya existe sin marcador del generador. No se reemplazara.' }
if ((Test-Path -LiteralPath $publicRoot) -and ((Get-Item -LiteralPath $publicRoot -Force).Attributes -band [IO.FileAttributes]::ReparsePoint)) { throw 'La raiz publica no puede ser un enlace.' }
$sheets = @('HojaDeJuego_Eco-v2','HojaDeJuego_ElysaraVelthaine','HojaDeJuego_Onesimo','HojaDeJuego_ValDraven')
$assetTypes = @('.png','.jpg','.jpeg','.webp','.svg','.ico','.woff','.woff2','.ttf')
$entries = New-Object 'System.Collections.Generic.List[string]'
function Copy-PublicFile([string]$relative) {
    $file = Join-Path $sourceRoot $relative
    $file = [IO.Path]::GetFullPath($file)
    if (!$file.StartsWith($sourceRoot + [IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)) { throw 'Origen fuera del proyecto.' }
    if (!(Test-Path -LiteralPath $file -PathType Leaf)) { throw "Falta un archivo requerido: $relative" }
    if ((Get-Item -LiteralPath $file).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "No se publican enlaces: $relative" }
    $parent = [IO.Path]::GetDirectoryName($file)
    while ($parent.Length -gt $sourceRoot.Length) {
        if ((Get-Item -LiteralPath $parent -Force).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "No se publica una carpeta enlazada: $relative" }
        $parent = [IO.Path]::GetDirectoryName($parent)
    }
    $target = Join-Path $buildRoot $relative
    $null = New-Item -ItemType Directory -Path ([IO.Path]::GetDirectoryName($target)) -Force
    Copy-Item -LiteralPath $file -Destination $target
    $entries.Add($relative.Replace('\','/'))
}
try {
    $null = New-Item -ItemType Directory -Path $buildRoot
    Copy-PublicFile 'index.html'
    foreach ($asset in @('assets/imagen/onesimo-y-fogini.png','assets/imagen/elarion-bloqueado.png')) { Copy-PublicFile $asset }
    foreach ($sheet in $sheets) {
        Copy-PublicFile ($sheet + '/index.html')
        if ($sheet -eq 'HojaDeJuego_Eco-v2') {
            foreach ($file in @('css/styles.css','js/app.js','js/character.js','js/rules.js','js/state.js')) { Copy-PublicFile ($sheet + '/' + $file) }
        } else {
            foreach ($file in @('style.css','app.js','data.js','engine.js')) { Copy-PublicFile ($sheet + '/' + $file) }
        }
        $assets = Join-Path $sourceRoot ($sheet + '/assets')
        foreach ($item in Get-ChildItem -LiteralPath $assets -Recurse -Force) {
            if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "Enlace no permitido en assets: $($item.Name)" }
            if ($item.PSIsContainer -or $assetTypes -notcontains $item.Extension.ToLowerInvariant()) { continue }
            # Los ocho PNG nuevos se conservan en origen; se sirven sus derivados ligeros.
            if ($item.Extension -eq '.png' -and (Test-Path -LiteralPath ([IO.Path]::ChangeExtension($item.FullName,'.webp')))) { continue }
            Copy-PublicFile $item.FullName.Substring($sourceRoot.Length + 1)
        }
    }
    [IO.File]::WriteAllText((Join-Path $buildRoot $marker),'{"generator":"Deathsleep-player-public","version":1}',(New-Object Text.UTF8Encoding($false)))
    # Se comprueban las rutas absolutas antes de borrar solamente la distribucion generada.
    $resolvedPublic = [IO.Path]::GetFullPath($publicRoot)
    if ($resolvedPublic -ne (Join-Path $sourceRoot '.public-jugadores') -or !$resolvedPublic.StartsWith($sourceRoot + [IO.Path]::DirectorySeparatorChar)) { throw 'Destino publico inseguro.' }
    if (Test-Path -LiteralPath $resolvedPublic) { Remove-Item -LiteralPath $resolvedPublic -Recurse -Force }
    Move-Item -LiteralPath $buildRoot -Destination $publicRoot
    $manifest = @{ generatedAt=[DateTime]::UtcNow.ToString('o'); root='.public-jugadores'; files=@($entries); excluded=@('HojaDeJuego_Elarion','qa','tests','qa-responsive','qa-cierre','indexLegacy','informes','respaldos','material del DM') } | ConvertTo-Json -Depth 4
    [IO.File]::WriteAllText((Join-Path $sourceRoot 'public-manifest.json'),$manifest,(New-Object Text.UTF8Encoding($false)))
    Write-Output $publicRoot
} finally {
    $resolvedBuild = [IO.Path]::GetFullPath($buildRoot)
    if ($resolvedBuild.StartsWith($sourceRoot + [IO.Path]::DirectorySeparatorChar + '.public-build-') -and (Test-Path -LiteralPath $resolvedBuild)) { Remove-Item -LiteralPath $resolvedBuild -Recurse -Force }
}
