@echo off
cd /d "%~dp0"
for %%S in (unpack-stay-research run-accommodation strip-internal-sections normalise-guide-links enrich-hub-intros build-sitemap build-image-credits check-images verify-site) do (
  echo.
  echo ===== %%S =====
  node scripts\%%S.mjs
  if errorlevel 1 (
    echo.
    echo STOPPED: %%S failed. Copy everything above and send it to Claude.
    pause
    exit /b 1
  )
)
where python >nul 2>nul
if not errorlevel 1 (
  echo.
  echo ===== tidy-pages =====
  python scripts\tidy-pages.py
)
echo.
echo ALL DONE - everything passed.
pause
