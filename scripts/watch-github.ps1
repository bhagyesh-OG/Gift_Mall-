$ErrorActionPreference = 'Stop'

Write-Host "GiftMall GitHub sync watcher started." -ForegroundColor Cyan
Write-Host "Folder: $((Get-Location).Path)" -ForegroundColor DarkGray
Write-Host "Polling GitHub every 5 seconds. Press Ctrl+C to stop." -ForegroundColor Yellow

while ($true) {
  try {
    $result = git pull --ff-only origin main 2>&1
    $text = ($result | Out-String).Trim()

    if ($text -and $text -notmatch 'Already up to date') {
      Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Repository updated." -ForegroundColor Green
      Write-Host $text
    }
  }
  catch {
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Sync failed: $($_.Exception.Message)" -ForegroundColor Red
  }

  Start-Sleep -Seconds 5
}
