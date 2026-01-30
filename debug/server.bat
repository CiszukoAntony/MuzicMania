@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

:: MuzicMania Server Manager Pro
:: ----------------------------

:: Generate Session ID once per window open
set LOG_SESSION_ID=%RANDOM%%RANDOM%

title MuzicMania - Servidor Local PRO
color 0D

:MENU
cls
echo.
echo   [95m ███╗   ███╗██╗   ██╗███████╗██╗ ██████╗███╗   ███╗ █████╗ ███╗   ██╗██╗ █████╗ [0m
echo   [95m ████╗ ████║██║   ██║╚══███╔╝██║██╔════╝████╗ ████║██╔══██╗████╗  ██║██║██╔══██╗[0m
echo   [95m ██╔████╔██║██║   ██║  ███╔╝ ██║██║     ██╔████╔██║███████║██╔██╗ ██║██║███████║[0m
echo   [95m ██║╚██╔╝██║██║   ██║ ███╔╝  ██║██║     ██║╚██╔╝██║██╔══██║██║╚██╗██║██║██╔══██║[0m
echo   [95m ██║ ╚═╝ ██║╚██████╔╝███████╗██║╚██████╗██║ ╚═╝ ██║██║  ██║██║ ╚████║██║██║  ██║[0m
echo   [95m ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝[0m
echo.
echo   [95m═══════════════════════════════════════════════════════════════════════════════[0m
echo.
echo     [1] [96mINICIAR SERVIDOR (Puerto 8000)[0m
echo     [2] [91mDETENER SERVIDOR[0m
echo     [3] [93mREINICIAR SERVIDOR (Limpieza Total)[0m
echo     [4] [90mSALIR[0m
echo.
echo   [95m═══════════════════════════════════════════════════════════════════════════════[0m
echo.

set /p opcion=" [97m» Selecciona una opción: [0m"

if "%opcion%"=="1" goto INICIAR
if "%opcion%"=="2" goto DETENER
if "%opcion%"=="3" goto REINICIAR
if "%opcion%"=="4" goto SALIR
goto MENU

:INICIAR
call logger.bat "START" "Iniciando servidor en puerto 8000"
cls
echo   [95m════════════════════════════════════════════[0m
echo     [96mINICIANDO SERVIDOR...[0m
echo   [95m════════════════════════════════════════════[0m
echo.

set CACHE_VERSION=%RANDOM%%RANDOM%
echo   [90m[*] Aplicando cache busting (v%CACHE_VERSION%)...[0m

powershell -Command "(gc ..\index.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\index.html"
powershell -Command "(gc ..\index.html) -replace 'script\.js\?v=\d+', 'script.js?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\index.html"
powershell -Command "(gc ..\game.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\game.html"
powershell -Command "(gc ..\leaderboard.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\leaderboard.html"
powershell -Command "(gc ..\contactanos.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\contactanos.html"
powershell -Command "(gc ..\profile.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\profile.html"
powershell -Command "(gc ..\changelog.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\changelog.html"
powershell -Command "(gc ..\terms.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\terms.html"
powershell -Command "Get-ChildItem -Path ..\ -Filter *.html | ForEach-Object { (Get-Content $_.FullName) -replace 'navigation\.js\?v=\d+', 'navigation.js?v=%CACHE_VERSION%' | Set-Content $_.FullName }"

echo.
echo   [92m✓ Cache aplicado correctamente.[0m
echo   [92m✓ Servidor ONLINE en: http://localhost:8000[0m
echo.
echo   [90mPresiona Ctrl+C para volver al menú principal[0m
echo   [95m════════════════════════════════════════════[0m
echo.

cd ..
python -m http.server 8000
cd debug
goto MENU

:DETENER
call logger.bat "STOP" "Deteniendo servidor manualmente"
cls
echo   [95m════════════════════════════════════════════[0m
echo     [91mDETENIENDO SERVIDOR...[0m
echo   [95m════════════════════════════════════════════[0m
echo.

taskkill /F /IM python.exe /FI "WINDOWTITLE eq MuzicMania*" 2>nul
taskkill /F /IM python.exe 2>nul

echo   [92m✓ Procesos de Python finalizados.[0m
timeout /t 2 > nul
goto MENU

:REINICIAR
call logger.bat "RESTART" "Solicitado reinicio completo"
cls
echo   [95m════════════════════════════════════════════[0m
echo     [93mREINICIANDO SERVIDOR...[0m
echo   [95m════════════════════════════════════════════[0m
echo.

taskkill /F /IM python.exe /FI "WINDOWTITLE eq MuzicMania*" 2>nul
taskkill /F /IM python.exe 2>nul
timeout /t 1 > nul
goto INICIAR

:SALIR
call logger.bat "EXIT" "Cerrando panel"
cls
echo.
echo   [95mCerrando servicios de MuzicMania...[0m
timeout /t 1 > nul
exit
