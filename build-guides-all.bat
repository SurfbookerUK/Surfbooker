@echo off
cd /d "%~dp0"
echo Rebuilding every surf guide from data\destination-research...
node scripts\build-destination-guides.mjs
if errorlevel 1 (echo Guide build failed & pause & exit /b 1)
call build-all.bat
