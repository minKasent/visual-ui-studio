@echo off
chcp 65001 >nul
title Visual UI Studio v7.2 - Live Web Editor
echo ====================================================================
echo   🚀 VISUAL UI STUDIO v7.2 - CONG CU KEO THA GIAO DIEN WEB REALTIME
echo   🌐 Dia chi Web:   http://localhost:4567
echo ====================================================================

:: Mo trinh duyet ngay lap tuc
start "" "http://localhost:4567"

:: Kiem tra xem cong 4567 da chay chua, neu chua thi khoi dong Server
netstat -ano | findstr ":4567 " | findstr "LISTENING" >nul
if %errorlevel%==0 (
  echo.
  echo ✅ Server Visual UI Studio dang chay san tai http://localhost:4567 !
  echo    Da mo trinh duyet cho ban. Cua so nay se tu dong dong sau 2 giay...
  timeout /t 2 >nul
  exit /b 0
)

echo.
echo ⏳ Dang khoi dong Node Server tai http://localhost:4567 ...
node "%~dp0server.js" "d:\Khoa\Porfolio"
pause
