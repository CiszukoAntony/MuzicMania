@echo off
cd /d "%~dp0"
chcp 65001 > nul
setlocal enabledelayedexpansion

:: Get ESC character for ANSI colors
for /f "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do set ESC=%%b

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

set LOG_NAME=log_%LOG_SESSION_ID%_%DATE_STAMP%.txt

title MuzicMania - Servidor Local PRO
:: 0F = Fondo negro, Texto blanco brillante para máxima legibilidad
color 0F

:MENU
cls
echo.
echo    %ESC%[95m ███╗   ███╗██╗   ██╗███████╗██╗ ██████╗███╗   ███╗ █████╗ ███╗   ██╗██╗ █████╗ %ESC%[0m
echo    %ESC%[95m ████╗ ████║██║   ██║╚══███╔╝██║██╔════╝████╗ ████║██╔══██╗████╗  ██║██║██╔══██╗ %ESC%[0m
echo    %ESC%[95m ██╔████╔██║██║   ██║  ███╔╝ ██║██║     ██╔████╔██║███████║██╔██╗ ██║██║███████║ %ESC%[0m
echo    %ESC%[95m ██║╚██╔╝██║██║   ██║ ███╔╝  ██║██║     ██║╚██╔╝██║██╔══██║██║╚██╗██║██║██╔══██║ %ESC%[0m
echo    %ESC%[95m ██║ ╚═╝ ██║╚██████╔╝███████╗██║╚██████╗██║ ╚═╝ ██║██║  ██║██║ ╚████║██║██║  ██║ %ESC%[0m
echo    %ESC%[95m ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝ %ESC%[0m
echo.
echo    %ESC%[95m═══════════════════════════════════════════════════════════════════════════════%ESC%[0m
echo.
echo     [1]  %ESC%[96mINICIAR SERVIDOR (Puerto 8000)%ESC%[0m
echo     [2]  %ESC%[91mDETENER SERVIDOR%ESC%[0m
echo     [3]  %ESC%[93mREINICIAR SERVIDOR (Limpieza Total)%ESC%[0m
echo     [4]  %ESC%[90mSALIR%ESC%[0m
echo.
echo    %ESC%[95m═══════════════════════════════════════════════════════════════════════════════%ESC%[0m
echo.

set /p opcion="  » Selecciona una opción: "

if "%opcion%"=="1" goto INICIAR
if "%opcion%"=="2" goto DETENER
if "%opcion%"=="3" goto REINICIAR
if "%opcion%"=="4" goto SALIR
goto MENU

:INICIAR
call logger.bat "START" "Iniciando servidor en puerto 8000"
cls
echo    %ESC%[95m════════════════════════════════════════════%ESC%[0m
echo      %ESC%[96mMUZICMANIA - ESTADO DEL SERVIDOR%ESC%[0m
echo    %ESC%[95m════════════════════════════════════════════%ESC%[0m
echo.
echo    » URL Local:       %ESC%[94mhttp://localhost:8000%ESC%[0m
echo    » Archivo Log:    %ESC%[93m%LOG_NAME%%ESC%[0m

:: Verificar si el log se creó/existe
if exist "..\logs\%LOG_NAME%" (
    echo    » Estado Log:     %ESC%[92mACTIVO Y REGISTRANDO ✓%ESC%[0m
) else (
    echo    » Estado Log:     %ESC%[91mERROR AL CREAR ARCHIVO !%ESC%[0m
)

:: Obtener versión de Python
for /f "tokens=*" %%i in ('python --version 2^>^&1') do set PY_VER=%%i
echo    » Motor:          %ESC%[90m%PY_VER%%ESC%[0m

echo.
echo    %ESC%[95m════════════════════════════════════════════%ESC%[0m
echo.

set CACHE_VERSION=%RANDOM%%RANDOM%
echo    [*] Ejecutando Cache Busting (v%CACHE_VERSION%)...

powershell -Command "(gc ..\index.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\index.html" >> ..\logs\%LOG_NAME% 2>&1
powershell -Command "(gc ..\index.html) -replace 'script\.js\?v=\d+', 'script.js?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\index.html" >> ..\logs\%LOG_NAME% 2>&1
powershell -Command "(gc ..\game.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\game.html" >> ..\logs\%LOG_NAME% 2>&1
powershell -Command "(gc ..\leaderboard.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\leaderboard.html" >> ..\logs\%LOG_NAME% 2>&1
powershell -Command "(gc ..\contactanos.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\contactanos.html" >> ..\logs\%LOG_NAME% 2>&1
powershell -Command "(gc ..\profile.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\profile.html" >> ..\logs\%LOG_NAME% 2>&1
powershell -Command "(gc ..\changelog.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\changelog.html" >> ..\logs\%LOG_NAME% 2>&1
powershell -Command "(gc ..\terms.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\terms.html" >> ..\logs\%LOG_NAME% 2>&1
powershell -Command "(gc ..\404.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 ..\404.html" >> ..\logs\%LOG_NAME% 2>&1
powershell -Command "Get-ChildItem -Path ..\ -Filter *.html | ForEach-Object { (Get-Content $_.FullName) -replace 'navigation\.js\?v=\d+', 'navigation.js?v=%CACHE_VERSION%' | Set-Content $_.FullName }" >> ..\logs\%LOG_NAME% 2>&1

echo.
echo    ✓ Configuración aplicada.
echo    ✓ Servidor ONLINE. Registrando actividad en %LOG_NAME%
echo.
echo.
echo    %ESC%[91mNOTA: La actividad se registrará en consola y en el archivo LOG.%ESC%[0m
echo    Presiona Ctrl+C para volver al panel de control
echo    %ESC%[95m════════════════════════════════════════════%ESC%[0m
echo.

cd ..
:: Redirigir stdout y stderr a consola y archivo de log simultáneamente usando el servidor Pro
python debug\serve_pro.py 2>&1 | powershell -Command "$Input | Tee-Object -FilePath logs\%LOG_NAME% -Append"
cd debug
goto MENU

:DETENER
call logger.bat "STOP" "Deteniendo servidor manualmente"
cls
echo    %ESC%[95m════════════════════════════════════════════%ESC%[0m
echo      %ESC%[91mDETENIENDO SERVIDOR...%ESC%[0m
echo    %ESC%[95m════════════════════════════════════════════%ESC%[0m
echo.

taskkill /F /IM python.exe /FI "WINDOWTITLE eq MuzicMania*" 2>nul
taskkill /F /IM python.exe 2>nul

echo    ✓ Procesos de Python finalizados.
timeout /t 2 > nul
goto MENU

:REINICIAR
call logger.bat "RESTART" "Solicitado reinicio completo"
cls
echo    %ESC%[95m════════════════════════════════════════════%ESC%[0m
echo      %ESC%[93mREINICIANDO SERVIDOR...%ESC%[0m
echo    %ESC%[95m════════════════════════════════════════════%ESC%[0m
echo.

taskkill /F /IM python.exe /FI "WINDOWTITLE eq MuzicMania*" 2>nul
taskkill /F /IM python.exe 2>nul
timeout /t 1 > nul
goto INICIAR

:SALIR
call logger.bat "EXIT" "Cerrando panel"
cls
echo.
echo    Cerrando servicios de MuzicMania...
timeout /t 1 > nul
exit
