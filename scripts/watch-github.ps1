$ErrorActionPreference = 'Stop'

Write-Host "GiftMall GitHub sync watcher started." -ForegroundColor Cyan
Write-Host "Folder: $((Get-Location).Path)" -ForegroundColor DarkGray
Write-Host "Polling GitHub every 5 seconds. Press Ctrl+C to stop." -ForegroundColor Yellow

while ($true) {
  try {
    $result = git pull --ff-only origin main 2>&1
    $text = ($result | Out-String).Trim()
    $time = Get-Date -Format 'HH:mm:ss'

    if ($text -match 'Already up to date') {
      Write-Host "[$time] ✓ Checked GitHub — already up to date." -ForegroundColor DarkGray
    } elseif ($text) {
      Write-Host "[$time] ✓ Repository updated — Vite should hot-reload the changes." -ForegroundColor Green
      Write-Host $text
    } else {
      Write-Host "[$time] ✓ GitHub checked." -ForegroundColor DarkGray
    }
  }
  catch {
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ✗ Sync failed: $($_.Exception.Message)" -ForegroundColor Red
  }

  Start-Sleep -Seconds 5
}
