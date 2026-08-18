$ErrorActionPreference = 'Continue'

Write-Host 'GiftMall GitHub sync watcher started.' -ForegroundColor Cyan
Write-Host "Folder: $((Get-Location).Path)" -ForegroundColor DarkGray
Write-Host 'Polling GitHub every 5 seconds. Press Ctrl+C to stop.' -ForegroundColor Yellow
Write-Host ''

while ($true) {
    $time = Get-Date -Format 'HH:mm:ss'
    try {
        $output = git pull --ff-only origin main 2>&1
        $exitCode = $LASTEXITCODE
        $text = ($output | Out-String).Trim()

        if ($exitCode -eq 0) {
            if ($text -match 'Already up to date') {
                Write-Host "[$time] OK - GitHub checked; already up to date." -ForegroundColor DarkGray
            } elseif ($text) {
                Write-Host "[$time] OK - Repository updated; Vite should hot-reload the changes." -ForegroundColor Green
                Write-Host $text
            } else {
                Write-Host "[$time] OK - GitHub checked." -ForegroundColor DarkGray
            }
        } else {
            Write-Host "[$time] ERROR - Git pull failed (exit code $exitCode)." -ForegroundColor Red
            if ($text) { Write-Host $text -ForegroundColor Red }
            Write-Host "[$time] The watcher will retry in 5 seconds." -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "[$time] ERROR - Watcher error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "[$time] The watcher will retry in 5 seconds." -ForegroundColor Yellow
    }

    Start-Sleep -Seconds 5
}
