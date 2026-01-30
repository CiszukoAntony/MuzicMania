@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

:: MuzicMania Server Manager Pro
:: ----------------------------

:: Generate Session ID once per window open
if "%LOG_SESSION_ID%"=="" (
    set LOG_SESSION_ID=%RANDOM%%RANDOM%
)

:: Get current date for log display
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set YEAR=!datetime:~0,4!
set MONTH=!datetime:~4,2!
set DAY=!datetime:~6,2!
set DATE_STAMP=!YEAR!-!MONTH!-!DAY!

set LOG_NAME=_log_%LOG_SESSION_ID%_%DATE_STAMP%.txt

title MuzicMania - Servidor Local PRO
color 0D

:MENU
cls
echo.
echo    [95m ███╗   ███╗██╗   ██╗███████╗██╗ ██████╗███╗   ███╗ █████╗ ███╗   ██╗██╗ █████╗  [0m
echo    [95m ████╗ ████║██║   ██║╚══███╔╝██║██╔════╝████╗ ████║██╔══██╗████╗  ██║██║██╔══██╗ [0m
echo    [95m ██╔████╔██║██║   ██║  ███╔╝ ██║██║     ██╔████╔██║███████║██╔██╗ ██║██║███████║ [0m
echo    [95m ██║╚██╔╝██║██║   ██║ ███╔╝  ██║██║     ██║╚██╔╝██║██╔══██║██║╚██╗██║██║██╔══██║ [0m
echo    [95m ██║ ╚═╝ ██║╚██████╔╝███████╗██║╚██████╗██║ ╚═╝ ██║██║  ██║██║ ╚████║██║██║  ██║ [0m
echo    [95m ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝ [0m
echo.
echo    [95m═══════════════════════════════════════════════════════════════════════════════ [0m
echo.
echo     [1]  [96mINICIAR SERVIDOR (Puerto 8000) [0m
echo     [2]  [91mDETENER SERVIDOR [0m
echo     [3]  [93mREINICIAR SERVIDOR (Limpieza Total) [0m
echo     [4]  [90mSALIR [0m
echo.
echo    [95m═══════════════════════════════════════════════════════════════════════════════ [0m
echo.

set /p opcion="  [97m» Selecciona una opción:  [0m"

if "%opcion%"=="1" goto INICIAR
if "%opcion%"=="2" goto DETENER
if "%opcion%"=="3" goto REINICIAR
if "%opcion%"=="4" goto SALIR
goto MENU

:INICIAR
call logger.bat "START" "Iniciando servidor en puerto 8000"
cls
echo    [95m════════════════════════════════════════════ [0m
echo      [96mMUZICMANIA - ESTADO DEL SERVIDOR [0m
echo    [95m════════════════════════════════════════════ [0m
echo.
echo    [97m» URL Local:       [94mhttp://localhost:8000 [0m
echo    [97m» Archivo Log:    [93m%LOG_NAME% [0m

:: Verificar si el log se creó/existe
if exist "..\logs\%LOG_NAME%" (
    echo    [97m» Estado Log:     [92mACTIVO Y REGISTRANDO ✓ [0m
) else (
    echo    [97m» Estado Log:     [91mERROR AL CREAR ARCHIVO ! [0m
)

:: Obtener versión de Python
for /f "tokens=*" %%i in ('python --version 2^>^&1') do set PY_VER=%%i
echo    [97m» Motor:          [90m%PY_VER% [0m

echo.
echo    [95m════════════════════════════════════════════ [0m
echo.

set CACHE_VERSION=%RANDOM%%RANDOM%
echo    [90m[*] Ejecutando Cache Busting (v%CACHE_VERSION%)... [0m

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
echo    [92m✓ Configuración aplicada. [0m
echo    [92m✓ Servidor ONLINE. Escuchando peticiones... [0m
echo.
echo    [90mPresiona Ctrl+C para volver al panel de control [0m
echo    [95m════════════════════════════════════════════ [0m
echo.

cd ..
python -m http.server 8000
cd debug
goto MENU

:DETENER
call logger.bat "STOP" "Deteniendo servidor manualmente"
cls
echo    [95m════════════════════════════════════════════ [0m
echo      [91mDETENIENDO SERVIDOR... [0m
echo    [95m════════════════════════════════════════════ [0m
echo.

taskkill /F /IM python.exe /FI "WINDOWTITLE eq MuzicMania*" 2>nul
taskkill /F /IM python.exe 2>nul

echo    [92m✓ Procesos de Python finalizados. [0m
timeout /t 2 > nul
goto MENU

:REINICIAR
call logger.bat "RESTART" "Solicitado reinicio completo"
cls
echo    [95m════════════════════════════════════════════ [0m
echo      [93mREINICIANDO SERVIDOR... [0m
echo    [95m════════════════════════════════════════════ [0m
echo.

taskkill /F /IM python.exe /FI "WINDOWTITLE eq MuzicMania*" 2>nul
taskkill /F /IM python.exe 2>nul
timeout /t 1 > nul
goto INICIAR

:SALIR
call logger.bat "EXIT" "Cerrando panel"
cls
echo.
echo    [95mCerrando servicios de MuzicMania... [0m
timeout /t 1 > nul
exit
