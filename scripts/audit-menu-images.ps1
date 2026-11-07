$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location $projectRoot
try {
    $cloud = node --input-type=module -e "import { loadEnv } from 'vite'; const cloud = loadEnv('development',process.cwd(),'VITE_CLOUDINARY_').VITE_CLOUDINARY_CLOUD; if (!cloud) throw new Error('Missing public Cloudinary cloud'); process.stdout.write(cloud);"
    if ($LASTEXITCODE -ne 0) { throw 'Could not obtain public Cloudinary cloud.' }
    $itemsJson = node --input-type=module -e "import { menuSections } from './src/data.js'; console.log(JSON.stringify(Object.entries(menuSections).flatMap(([category, section]) => section.items.map(({id,image}) => ({id,category,image})))));"
    if ($LASTEXITCODE -ne 0) { throw 'Could not import menuSections.' }
    $items = ConvertFrom-Json -InputObject ($itemsJson -join "`n")
    if (-not $items.Count) { throw 'No menu images found.' }

    $results = @()
    $index = 0
    foreach ($item in $items) {
        $index++
        Write-Host "[$index/$($items.Count)] $($item.category)/$($item.id) checking..."
        $result = [ordered]@{
            id = $item.id
            category = $item.category
            image = $item.image
            status = $null
        }
        if ($item.image.StartsWith('/')) {
            $localPath = Join-Path (Join-Path $projectRoot 'public') $item.image.TrimStart('/')
            if (Test-Path -LiteralPath $localPath -PathType Leaf) {
                $result.status = 200
            } else {
                $result.status = 404
            }
        } else {
            $url = "https://res.cloudinary.com/$cloud/image/upload/f_auto,q_auto:eco,dpr_auto/c_fill,g_auto,ar_4:3,w_320/$($item.image)"
            try {
                $response = Invoke-WebRequest -Uri $url -UseBasicParsing -Method Head -TimeoutSec 8
                $result.status = [int]$response.StatusCode
                $contentType = $response.Headers['Content-Type']
                if ($contentType) { $result.contentType = [string]$contentType }
            } catch {
                $failure = $_
                $response = $failure.Exception.Response
                if ($null -ne $response -and $null -ne $response.StatusCode) {
                    $result.status = [int]$response.StatusCode
                    $contentType = $response.Headers['Content-Type']
                    if ($contentType) { $result.contentType = [string]$contentType }
                } else {
                    $result.status = "error: $($failure.Exception.Message)"
                }
            }
        }
        $results += [pscustomobject]$result
        Write-Host "[$index/$($items.Count)] $($item.id): $($result.status) $($result.contentType)"
    }

    $report = [ordered]@{
        checkedAt = [DateTime]::UtcNow.ToString('o')
        items = $results
    }
    # Preserve the original failure audit used for asset provenance and tests.
    $outputPath = Join-Path $PSScriptRoot 'menu-assets/current-image-audit.json'
    $json = $report | ConvertTo-Json -Depth 5
    [System.IO.File]::WriteAllText($outputPath, $json + [Environment]::NewLine, [System.Text.UTF8Encoding]::new($false))
    $results | Group-Object status | Select-Object Name, Count | Format-Table -AutoSize
    $results | Where-Object { $_.status -ne 200 } | Select-Object id, status | Format-Table -AutoSize
} finally {
    Pop-Location
}