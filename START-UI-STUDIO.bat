@echo off
chcp 65001 >nul
title Visual UI Studio Pro v3.0 - Kéo Thả Giao Diện Web Tức Thì
echo ============================================================================
echo   🚀 ĐANG KHỞI ĐỘNG VISUAL UI STUDIO PRO v3.0...
echo   👉 Trình duyệt sẽ tự động mở sau giây lát!
echo   💡 Mẹo: Bạn có thể kéo thả bất kỳ thư mục Web nào vào biểu tượng file .bat này!
echo ============================================================================
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Máy tính chưa cài Node.js. Đang mở bản chạy trực tiếp trên trình duyệt...
    start "" "%~dp0public\index.html"
    exit /b
)
node "%~dp0server.js" --open %1
pause
