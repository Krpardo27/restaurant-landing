param(
    [switch]$ValidateOnly,
    [switch]$Resume,
    [string]$SourceCacheDirectory
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path -Parent $PSScriptRoot
$candidatePath = Join-Path $PSScriptRoot 'menu-assets/final-candidates.json'
$publicRoot = Join-Path $projectRoot 'public'
$menuRoot = Join-Path $publicRoot 'menu'
$utf8 = New-Object System.Text.UTF8Encoding($false)
$headers = @{ 'User-Agent' = 'RestaurantLandingImageImporter/1.0 (local menu asset preparation)' }

function ConvertTo-PortableJson($Value) {
    if ($null -eq $Value) { return 'null' }
    if ($Value -is [string] -or $Value -is [ValueType]) {
        return ConvertTo-Json -InputObject $Value -Depth 20 -Compress
    }
    if ($Value -is [Array] -or $Value -is [System.Collections.IList]) {
        $elements = @($Value | ForEach-Object { ConvertTo-PortableJson $_ })
        return '[' + ($elements -join ',') + ']'
    }
    if ($Value -is [System.Collections.IDictionary]) {
        $properties = @(foreach ($key in $Value.Keys) {
            (ConvertTo-Json -InputObject ([string]$key) -Compress) + ':' + (ConvertTo-PortableJson $Value[$key])
        })
        return '{' + ($properties -join ',') + '}'
    }
    if ($Value -is [pscustomobject]) {
        $properties = @(foreach ($property in $Value.PSObject.Properties) {
            (ConvertTo-Json -InputObject $property.Name -Compress) + ':' + (ConvertTo-PortableJson $property.Value)
        })
        return '{' + ($properties -join ',') + '}'
    }
    return ConvertTo-Json -InputObject $Value -Depth 20 -Compress
}

function Write-Json($Path, $Value) {
    [IO.Directory]::CreateDirectory((Split-Path -Parent $Path)) | Out-Null
    [IO.File]::WriteAllText($Path, (ConvertTo-PortableJson $Value) + "`n", $utf8)
}

function Plain-Text([string]$Html) {
    $text = [regex]::Replace($Html, '(?is)<(script|style)\b[^>]*>.*?</\1>', '')
    $text = [regex]::Replace($text, '<[^>]+>', ' ')
    $text = [Net.WebUtility]::HtmlDecode($text)
    return [regex]::Replace($text, '\s+', ' ').Trim()
}

function Test-Coverage($Candidates) {
    $audit = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'menu-assets/cloudinary-audit.json') -Raw -Encoding UTF8 | ConvertFrom-Json
    $expected = @($audit.items | Where-Object { $_.status -ne 200 } | ForEach-Object { $_.id } | Sort-Object)
    $actual = @($Candidates | ForEach-Object { $_.itemIds } | Sort-Object)
    if ($expected.Count -ne 35 -or $actual.Count -ne 35 -or @(Compare-Object $expected $actual).Count -ne 0) {
        throw 'Coverage must equal the 35 broken IDs in the existing audit, without duplicates or good pizzas.'
    }
    if (@($Candidates | Group-Object commonsTitle | Where-Object Count -gt 1).Count) { throw 'Duplicate source assets.' }
    foreach ($candidate in $Candidates) {
        if ($candidate.itemIds -isnot [Array] -or $candidate.itemIds.Count -eq 0) { throw 'itemIds must be a nonempty array.' }
        if ($candidate.category -notmatch '^[a-z]+$' -or $candidate.filename -notmatch '^[a-z0-9-]+\.jpg$') { throw 'Unsafe output path.' }
        foreach ($itemId in $candidate.itemIds) {
            if ($itemId -isnot [string]) { throw 'Item IDs must be strings.' }
            if (@($audit.items | Where-Object { $_.id -eq $itemId -and $_.category -eq $candidate.category }).Count -ne 1) { throw "Category mismatch: $itemId" }
        }
    }
}

function Test-Manifest {
    $manifest = Get-Content -LiteralPath (Join-Path $menuRoot 'manifest.json') -Raw -Encoding UTF8 | ConvertFrom-Json
    if ($manifest -isnot [Array] -or $manifest.Count -ne 30) { throw 'Manifest must be an array of 30 assets.' }
    Test-Coverage $manifest
    $totalBytes = 0L
    $fileCount = 0
    $seen = @{}
    foreach ($entry in $manifest) {
        foreach ($dimension in @($entry.sourceWidth, $entry.sourceHeight)) {
            if (($dimension -isnot [int] -and $dimension -isnot [long]) -or $dimension -le 0) { throw 'Source dimensions must be positive integers.' }
        }
        if ($entry.variants -isnot [Array] -or $entry.variants.Count -eq 0) { throw 'Variants must be a nonempty array.' }
        if ($entry.license -notmatch '^(CC BY(?:-SA)? [1-4]\.0|CC0)$' -or $entry.licenseUrl -notmatch '^https://creativecommons\.org/(licenses/by(?:-sa)?/[1-4]\.0/|publicdomain/zero/1\.0/)$') { throw "Invalid license: $($entry.file)" }
        if ($entry.sourcePage -notmatch '^https://commons\.wikimedia\.org/wiki/File:' -or $entry.author -match '<[^>]+>' -or -not $entry.author) { throw 'Invalid attribution.' }
        $maximum = ($entry.variants | Measure-Object width -Maximum).Maximum
        $expectedMaximum = [Math]::Min(960, $entry.sourceWidth)
        if ($maximum -ne $expectedMaximum -or @($entry.variants | Group-Object width | Where-Object Count -gt 1).Count) { throw 'Invalid variant widths.' }
        $expectedWidths = @(320, 640, $expectedMaximum | Where-Object { $_ -le $expectedMaximum } | Sort-Object -Unique)
        if (@(Compare-Object $expectedWidths @($entry.variants.width | Sort-Object)).Count) { throw 'Missing variant.' }
        foreach ($variant in $entry.variants) {
            foreach ($number in @($variant.width, $variant.height, $variant.bytes)) {
                if (($number -isnot [int] -and $number -isnot [long]) -or $number -le 0) { throw 'Variant dimensions and bytes must be positive integers.' }
            }
            if ($variant.src -isnot [string] -or $variant.src -notmatch '^/menu/[a-z]+/[a-z0-9-]+\.jpg$' -or $variant.sha256 -isnot [string] -or $variant.sha256 -cnotmatch '^[a-f0-9]{64}$') { throw 'Invalid variant path or SHA256 type/format.' }
            if ($seen.ContainsKey($variant.src)) { throw 'Duplicate output.' }
            $seen[$variant.src] = $true
            $path = Join-Path $publicRoot $variant.src.TrimStart('/')
            $stream = [IO.File]::OpenRead($path)
            $image = $null
            try {
                $image = [Drawing.Image]::FromStream($stream, $true, $true)
                if ($image.RawFormat.Guid -ne [Drawing.Imaging.ImageFormat]::Jpeg.Guid -or $image.Width -ne $variant.width -or $image.Height -ne $variant.height) { throw "Invalid JPEG: $path" }
                if ($image.Width -gt $entry.sourceWidth -or [Math]::Abs($image.Height - ($image.Width * $entry.sourceHeight / $entry.sourceWidth)) -gt 1) { throw 'Upscaling or incorrect aspect ratio.' }
            } finally {
                if ($image) { $image.Dispose() }
                $stream.Dispose()
            }
            $bytes = (Get-Item -LiteralPath $path).Length
            $hash = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash.ToLowerInvariant()
            if ($bytes -ne $variant.bytes -or $hash -ne $variant.sha256) { throw "Integrity mismatch: $path" }
            $totalBytes += $bytes
            $fileCount++
        }
        if ($entry.file -notin @($entry.variants.src)) { throw 'Missing base image.' }
    }
    $diskFiles = @(Get-ChildItem -LiteralPath $menuRoot -Recurse -File -Filter '*.jpg')
    if ($diskFiles.Count -ne $fileCount) { throw 'Untracked JPEG files in public/menu.' }
    Write-Host "VALIDATED assets=$($manifest.Count) IDs=35 JPEGs=$fileCount bytes=$totalBytes MiB=$([Math]::Round($totalBytes / 1MB, 2))"
}

if ($ValidateOnly) {
    Test-Manifest
    exit 0
}

if (Test-Path -LiteralPath $candidatePath) {
    $candidates = Get-Content -LiteralPath $candidatePath -Raw -Encoding UTF8 | ConvertFrom-Json
} else {
    $candidates = @(
        Get-Content -LiteralPath (Join-Path $PSScriptRoot 'menu-assets/savoury-candidates.json') -Raw -Encoding UTF8 | ConvertFrom-Json
        Get-Content -LiteralPath (Join-Path $PSScriptRoot 'menu-assets/sweet-candidates.json') -Raw -Encoding UTF8 | ConvertFrom-Json
    )
    $candidates = @($candidates | ForEach-Object { $_ })
    $replacements = @{
        'gnocchi-pesto' = @('File:Gnocchi al pesto - homemade.jpg', 'gnocchi-pesto-caseros.jpg', 'exact', 'Gnocchi caseros con pesto; no es la receta ni la presentacion del restaurante.')
        'coca-cola' = @('File:Coca-Cola 330ml can.jpg', 'coca-cola-lata-330ml.jpg', 'related', 'Lata de Coca-Cola de 330 ml en Sudafrica; no acredita los 350 ml del catalogo. La licencia fotografica no concede derechos de marca ni implica respaldo comercial.')
        'gelato-pistacho' = @('File:Pistachio nougat icecream.jpg', 'helado-pistacho-nougat.jpg', 'related', 'Helado de pistacho y nougat; no acredita pistacho puro ni la receta o porcion del restaurante.')
        'montanara' = @('File:Pizza fritta in Rome (1).jpg', 'pizza-frita-roma.jpg', 'related', 'Pizza frita en Roma; no se acredita montanara napolitana ni su cobertura o receta exacta. Referencia de la misma familia, no producto del restaurante.')
    }
    foreach ($candidate in $candidates) {
        $replacement = $replacements[$candidate.itemIds[0]]
        if ($replacement) {
            $candidate.commonsTitle = $replacement[0]
            $candidate.filename = $replacement[1]
            $candidate.match = $replacement[2]
            $candidate.note = $replacement[3]
        }
    }
    $candidates += [pscustomobject]@{
        category = 'postres'; itemIds = @('angioletti-nutella', 'mini-angioletti-nutella')
        filename = 'masa-frita-chocolate.jpg'; commonsTitle = 'File:Chocolate con churros de lazo.jpg'
        match = 'related'; note = 'La fuente muestra churros de lazo con chocolate a la taza, no angioletti ni Nutella. Referencia ilustrativa de masa frita con chocolate compartida por ambos IDs; no acredita receta ni porcion del restaurante.'
    }
}

Test-Coverage $candidates
$alts = @{
    'arancini' = 'Croquetas de arroz doradas en un plato'
    'montanara' = 'Pizza frita servida en Roma'
    'bruschetta-mortadella' = 'Rebanadas de pan con tomate y hierbas'
    'bruschetta-fiorentina' = 'Pan tostado con setas y cebolla caramelizada'
    'rosticceria' = 'Croquetas de patata fritas'
    'antipasti-tabla' = 'Tabla de quesos y fiambres'
    'gnocchi-sorrentina' = 'Gnocchi con salsa de tomate y queso'
    'gnocchi-pesto' = 'Gnocchi caseros con pesto verde'
    'gnocchi-formaggi' = 'Gnocchi horneados con queso Taleggio y salvia'
    'puttanesca' = 'Espaguetis con tomate, aceitunas y alcaparras'
    'carbonara' = 'Espaguetis a la carbonara'
    'lasagna' = 'Porcion de lasagna de carne'
    'risotto-porcini' = 'Risotto con setas porcini'
    'cannoli-alleria' = 'Cannoli con pistacho'
    'gelato-frutos-rojos' = 'Helado de fresa y stracciatella'
    'gelato-amaretto' = 'Copa de helado de frutos secos con salsa de caramelo'
    'gelato-vainilla' = 'Helado de vainilla'
    'gelato-pistacho' = 'Helado de pistacho y nougat'
    'gelato-menta' = 'Helado de menta con chocolate y granillo de colores'
    'tiramisu-clasico' = 'Porcion individual de tiramisu'
    'coca-cola' = 'Lata de Coca-Cola de 330 ml'
    'sprite' = 'Botella de vidrio de Sprite con otras botellas al fondo'
    'limonada' = 'Vaso de limonada'
    'jugo-mango' = 'Vasos de jugo de mango'
    'extra-verdura' = 'Pimientos frescos de distintos colores'
    'extra-queso' = 'Bloque de queso parmesano con cuchillo'
    'extra-burrata' = 'Queso burrata con tomates al fondo'
    'sorrentino-kids' = 'Espaguetis con salsa de tomate y queso'
    'diavoletta-kids' = 'Pizza margarita con tomate, queso y albahaca'
    'angioletti-nutella' = 'Masa frita con chocolate'
}

$metadata = @{}
if ($Resume) {
    foreach ($candidate in $candidates) {
        if (-not $candidate.metadataCheckedAt -or ([DateTime]::UtcNow - [DateTime]::Parse($candidate.metadataCheckedAt).ToUniversalTime()).TotalHours -gt 24) { throw 'Resume requires verified metadata from the last 24 hours. Run without -Resume to refresh.' }
    }
}
for ($offset = 0; -not $Resume -and $offset -lt $candidates.Count; $offset += 10) {
    $last = [Math]::Min($offset + 9, $candidates.Count - 1)
    $titles = @($candidates[$offset..$last] | ForEach-Object { $_.commonsTitle }) -join '|'
    $uri = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url%7Csize%7Cmime%7Cextmetadata&iiurlwidth=960&titles=' + [uri]::EscapeDataString($titles)
    Write-Host "Metadata batch $([int]($offset / 10) + 1)"
    $response = Invoke-RestMethod -Uri $uri -Headers $headers -TimeoutSec 90
    if ($response.error) { throw ($response.error | ConvertTo-Json -Compress) }
    foreach ($page in $response.query.pages.PSObject.Properties.Value) {
        if (-not $page.imageinfo) { throw "Missing Commons image: $($page.title)" }
        $metadata[$page.title.Replace('_', ' ')] = $page
    }
}

foreach ($candidate in $candidates) {
    if ($Resume) { continue }
    $page = $metadata[$candidate.commonsTitle.Replace('_', ' ')]
    if (-not $page) { throw "No metadata for $($candidate.commonsTitle)" }
    $info = $page.imageinfo[0]
    $license = Plain-Text $info.extmetadata.LicenseShortName.value
    if ($license -notmatch '^(CC BY(?:-SA)? [1-4]\.0|CC0)$') { throw "Disallowed license: $license ($($page.title))" }
    $licenseUri = [uri]$info.extmetadata.LicenseUrl.value
    if ($licenseUri.Host -ne 'creativecommons.org' -or $licenseUri.AbsolutePath -notmatch '^/(licenses/by(?:-sa)?/[1-4]\.0|publicdomain/zero/1\.0)(/deed\.[a-z-]+)?/?$') { throw "Disallowed license URL: $licenseUri" }
    $licensePath = $licenseUri.AbsolutePath -replace '/deed\.[a-z-]+/?$', ''
    $licenseUrl = 'https://creativecommons.org' + $licensePath.TrimEnd('/') + '/'
    if ($info.mime -notin @('image/jpeg', 'image/png')) { throw "Invalid source MIME: $($info.mime)" }
    if ($info.descriptionurl -notmatch '^https://commons\.wikimedia\.org/wiki/File:') { throw 'Invalid Commons source page.' }
    $downloadUrl = if ($info.width -gt 960) { $info.thumburl } else { $info.url }
    $downloadUrl = ([uri]$downloadUrl).GetLeftPart([UriPartial]::Path)
    $author = Plain-Text $info.extmetadata.Artist.value
    if (-not $author) { throw "Missing author: $($page.title)" }
    $description = $alts[$candidate.itemIds[0]]
    if (-not $description) { throw 'Missing Spanish alt.' }
    $values = @{
        commonsTitle = $page.title; title = (Plain-Text $info.extmetadata.ObjectName.value)
        author = $author; license = $license; licenseUrl = $licenseUrl
        sourcePage = $info.descriptionurl; downloadUrl = $downloadUrl
        mime = $info.mime; sourceWidth = [int]$info.width; sourceHeight = [int]$info.height
        width = [Math]::Min(960, [int]$info.width)
        height = [int][Math]::Round([Math]::Min(960, [int]$info.width) * $info.height / $info.width)
        alt = $description + ', imagen ilustrativa'; metadataCheckedAt = [DateTime]::UtcNow.ToString('o')
    }
    foreach ($key in $values.Keys) { $candidate | Add-Member -NotePropertyName $key -NotePropertyValue $values[$key] -Force }
}
Write-Json $candidatePath $candidates

$manifest = @()
$failures = @()
$jpegCodec = [Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
foreach ($candidate in $candidates) {
    $temporary = [IO.Path]::GetTempFileName()
    $source = $null
    $sourceStream = $null
    try {
        $basePath = Join-Path $menuRoot "$($candidate.category)/$($candidate.filename)"
        $reuse = $Resume -and (Test-Path -LiteralPath $basePath)
        if ($reuse) {
            Write-Host "Reuse $($candidate.category)/$($candidate.filename)"
            $sourceStream = [IO.File]::OpenRead($basePath)
            $contentType = 'image/jpeg'
        } else {
            $cachedSource = if ($SourceCacheDirectory) { Join-Path $SourceCacheDirectory $candidate.filename } else { $null }
            if ($cachedSource -and (Test-Path -LiteralPath $cachedSource)) {
                Write-Host "Cached source $($candidate.category)/$($candidate.filename)"
                Copy-Item -LiteralPath $cachedSource -Destination $temporary
                $originalUri = [uri]$candidate.downloadUrl
                if ($originalUri.Host -eq 'upload.wikimedia.org' -and $originalUri.AbsolutePath -notmatch '/thumb/') {
                    $candidate.downloadUrl = 'https://thumb.wikimedia.org' + $originalUri.AbsolutePath.Replace('/wikipedia/commons/', '/wikipedia/commons/thumb/') + '/960px-' + $originalUri.Segments[-1]
                }
                $contentType = $candidate.mime
            } else {
            Write-Host "Download $($candidate.category)/$($candidate.filename)"
            try {
                $response = Invoke-WebRequest -Uri $candidate.downloadUrl -Headers $headers -UseBasicParsing -OutFile $temporary -PassThru -TimeoutSec 120
            } catch {
                $httpResponse = $_.Exception.Response
                $originalUri = [uri]$candidate.downloadUrl
                if (-not $httpResponse -or [int]$httpResponse.StatusCode -ne 429 -or $originalUri.Host -ne 'upload.wikimedia.org') { throw }
                $thumbnailWidth = 960
                $sourceFilename = $originalUri.Segments[-1]
                $thumbnailUrl = 'https://thumb.wikimedia.org' + $originalUri.AbsolutePath.Replace('/wikipedia/commons/', '/wikipedia/commons/thumb/') + "/$($thumbnailWidth)px-$sourceFilename"
                Write-Host "Original returned 429; one thumbnail alternative at $thumbnailWidth px."
                $response = Invoke-WebRequest -Uri $thumbnailUrl -Headers $headers -UseBasicParsing -OutFile $temporary -PassThru -TimeoutSec 120
                $candidate.downloadUrl = $thumbnailUrl
            }
            $contentType = ([string]$response.Headers['Content-Type']).Split(';')[0].Trim().ToLowerInvariant()
            if ($contentType -notin @('image/jpeg', 'image/png')) { throw "HTTP MIME is $contentType, not an allowed image" }
            }
            $sourceStream = [IO.File]::OpenRead($temporary)
        }
        $source = [Drawing.Image]::FromStream($sourceStream, $true, $true)
        $decodedMime = if ($source.RawFormat.Guid -eq [Drawing.Imaging.ImageFormat]::Jpeg.Guid) { 'image/jpeg' } elseif ($source.RawFormat.Guid -eq [Drawing.Imaging.ImageFormat]::Png.Guid) { 'image/png' } else { throw 'Decoded format is not JPEG/PNG' }
        if ($decodedMime -ne $contentType -or (-not $reuse -and $decodedMime -ne $candidate.mime)) { throw 'HTTP, decoded and Commons MIME disagree' }
        $maximum = [Math]::Min(960, $candidate.sourceWidth)
        if ($source.Width -lt $maximum -or [Math]::Abs($source.Height - ($source.Width * $candidate.sourceHeight / $candidate.sourceWidth)) -gt 1) { throw 'Downloaded dimensions do not match Commons metadata' }
        $widths = @(320, 640, $maximum | Where-Object { $_ -le $maximum } | Sort-Object -Unique)
        $variants = @()
        $slug = [IO.Path]::GetFileNameWithoutExtension($candidate.filename)
        foreach ($width in $widths) {
            $height = [Math]::Max(1, [int][Math]::Round($width * $source.Height / $source.Width))
            $filename = if ($width -eq $maximum) { $candidate.filename } else { "$slug-$width.jpg" }
            $relative = "/menu/$($candidate.category)/$filename"
            $destination = Join-Path $publicRoot $relative.TrimStart('/')
            [IO.Directory]::CreateDirectory((Split-Path -Parent $destination)) | Out-Null
            if (-not $reuse) {
            $bitmap = New-Object Drawing.Bitmap([int]$width, [int]$height)
            $graphics = [Drawing.Graphics]::FromImage($bitmap)
            $parameters = New-Object Drawing.Imaging.EncoderParameters(1)
            try {
                $graphics.Clear([Drawing.Color]::White)
                $graphics.CompositingQuality = [Drawing.Drawing2D.CompositingQuality]::HighQuality
                $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                $graphics.DrawImage($source, 0, 0, [int]$width, [int]$height)
                $parameters.Param[0] = New-Object Drawing.Imaging.EncoderParameter([Drawing.Imaging.Encoder]::Quality, [long]84)
                $bitmap.Save($destination, $jpegCodec, $parameters)
            } finally {
                $parameters.Dispose()
                $graphics.Dispose()
                $bitmap.Dispose()
            }
            }
            $checkImage = [Drawing.Image]::FromFile($destination)
            try {
                if ($checkImage.RawFormat.Guid -ne [Drawing.Imaging.ImageFormat]::Jpeg.Guid -or $checkImage.Width -ne $width -or $checkImage.Height -ne $height) { throw "Invalid generated/cached JPEG: $destination" }
            } finally { $checkImage.Dispose() }
            $variants += [pscustomobject]@{
                src = $relative; width = [int]$width; height = $height
                bytes = (Get-Item -LiteralPath $destination).Length
                sha256 = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLowerInvariant()
            }
        }
        $manifest += [pscustomobject][ordered]@{
            file = "/menu/$($candidate.category)/$($candidate.filename)"
            category = $candidate.category; filename = $candidate.filename; itemIds = @($candidate.itemIds)
            creditId = "$($candidate.category)-$slug"; commonsTitle = $candidate.commonsTitle
            title = $candidate.title; author = $candidate.author; license = $candidate.license
            licenseUrl = $candidate.licenseUrl; sourcePage = $candidate.sourcePage; downloadUrl = $candidate.downloadUrl
            modifications = 'Redimensionada sin ampliar, proporcion original preservada y convertida a JPEG con calidad 84; sin recorte. Todas las variantes conservan la licencia indicada.'
            note = $candidate.note; alt = $candidate.alt; match = $candidate.match
            sourceWidth = $candidate.sourceWidth; sourceHeight = $candidate.sourceHeight
            metadataCheckedAt = $candidate.metadataCheckedAt; downloadedAt = [DateTime]::UtcNow.ToString('o')
            variants = @($variants)
        }
    } catch {
        $message = "$($candidate.commonsTitle): $($_.Exception.Message)"
        $failures += $message
        Write-Warning $message
    } finally {
        if ($source) { $source.Dispose() }
        if ($sourceStream) { $sourceStream.Dispose() }
        Remove-Item -LiteralPath $temporary -Force
    }
}
Write-Json $candidatePath $candidates
if ($failures.Count) { throw ("Incomplete download ($($failures.Count) failures):`n" + ($failures -join "`n")) }
Write-Json (Join-Path $menuRoot 'manifest.json') $manifest
Test-Manifest

$images = [ordered]@{}
$items = [ordered]@{}
foreach ($entry in $manifest) {
    $images[$entry.file] = [ordered]@{
        variants = @($entry.variants | Select-Object src, width, height)
        creditId = $entry.creditId; alt = $entry.alt
    }
    foreach ($itemId in $entry.itemIds) { $items[$itemId] = $entry.file }
}
$module = 'export const menuImages = ' + (ConvertTo-PortableJson $images) + ";`n`nexport const menuItemImages = " + (ConvertTo-PortableJson $items) + ";`n"
$modulePath = Join-Path $projectRoot 'src/data/menuImages.js'
[IO.Directory]::CreateDirectory((Split-Path -Parent $modulePath)) | Out-Null
[IO.File]::WriteAllText($modulePath, $module, $utf8)