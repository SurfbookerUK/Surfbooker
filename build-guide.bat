@echo off
cd /d "%~dp0"
if "%1"=="" (
  echo Usage: build-guide.bat compton-bay [more-slugs]
  pause
  exit /b 1
)
:next
if "%1"=="" goto done
echo ===== guide %1 =====
node scripts\build-destination-guides.mjs --only=%1
if errorlevel 1 (
  echo STOPPED: guide %1 failed. Copy everything above and send it to Claude.
  pause
  exit /b 1
)
shift
goto next
:done
call build-all.bat
