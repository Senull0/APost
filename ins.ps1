
$parent_dir = "client"
function CommandExists {
    param (
        [string]$CommandName
    )
    return $null -ne (Get-Command -Name $CommandName -ErrorAction SilentlyContinue)
}


if (CommandExists "pnpm") {
    $packageManager = "pnpm"
}

elseif (CommandExists "npm") {
    $packageManager = "npm"
}

else {
    Write-Host "Error"
    exit 1
}



$dirs = Get-ChildItem -Path $parent_dir -Directory
$package = "package.json"
foreach ($d in $dirs) {
    $package_path = Join-Path $d $package
    if (Test-Path "$package_path" -PathType Leaf) {
        Push-Location $d 
        & $packageManager install
        Pop-Location
    }
    else {
      Write-Host "Error"
      continue
    }
}

Clear-Host
Write-Host "Done"