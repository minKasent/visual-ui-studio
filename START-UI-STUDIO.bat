@echo off
chcp 65001 >nul
title Visual UI Studio - Cong Cu Keo Tha Giao Dien Web Realtime
echo ========================================================
echo   🚀 Dang khoi dong Visual UI Studio...
echo   👉 Trinh duyet se tu dong mo tai: http://localhost:4567
echo ========================================================
start "" "http://localhost:4567"
node "%~dp0server.js"
pause
