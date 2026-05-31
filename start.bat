@echo off
cd /d "%~dp0"
echo Building Sharh Library...
call node node_modules/next/dist/bin/next build
echo Starting server on http://localhost:3000
node node_modules/next/dist/bin/next start -p 3000
pause
