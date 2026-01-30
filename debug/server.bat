@echo off
chcp 65001 > nul
title MuzicMania - Servidor Local
color 0B

:MENU
cls
echo ╔════════════════════════════════════════════╗
echo ║     MUZICMANIA - SERVIDOR LOCAL            ║
echo ╚════════════════════════════════════════════╝
echo.
echo  [1] Iniciar servidor (Puerto 8000)
echo  [2] Detener servidor
echo  [3] Reiniciar servidor
echo  [4] Salir
echo.
echo ════════════════════════════════════════════
echo.

set /p opcion="Selecciona una opción: "

if "%opcion%"=="1" goto INICIAR
if "%opcion%"=="2" goto DETENER
if "%opcion%"=="3" goto REINICIAR
if "%opcion%"=="4" goto SALIR
echo.
echo [ERROR] Opción inválida. Intenta de nuevo.
timeout /t 2 > nul
goto MENU

:INICIAR
call logger.bat "START" "Iniciando servidor en puerto 8000"
cls
echo ════════════════════════════════════════════
echo  INICIANDO SERVIDOR...
echo ════════════════════════════════════════════
echo.

REM Generar número aleatorio para cache busting
set CACHE_VERSION=%RANDOM%%RANDOM%

echo [*] Aplicando cache busting (v%CACHE_VERSION%)...

REM Actualizar referencias CSS/JS en archivos HTML
REM Actualizar referencias CSS/JS en archivos HTML - Usando UTF8 para preservar caracteres especiales
powershell -Command "(gc index.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 index.html"
powershell -Command "(gc index.html) -replace 'script\.js\?v=\d+', 'script.js?v=%CACHE_VERSION%' | Out-File -encoding UTF8 index.html"
powershell -Command "(gc game.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 game.html"
powershell -Command "(gc leaderboard.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 leaderboard.html"
powershell -Command "(gc contactanos.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 contactanos.html"
powershell -Command "(gc profile.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 profile.html"
powershell -Command "(gc changelog.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 changelog.html"
powershell -Command "(gc terms.html) -replace 'styles\.css\?v=\d+', 'styles.css?v=%CACHE_VERSION%' | Out-File -encoding UTF8 terms.html"
powershell -Command "Get-ChildItem -Filter *.html | ForEach-Object { (Get-Content $_.FullName) -replace 'navigation\.js\?v=\d+', 'navigation.js?v=%CACHE_VERSION%' | Set-Content $_.FullName }"

echo ✓ Cache busting aplicado correctamente
echo ✓ Servidor corriendo en: http://localhost:8000
echo.
echo Presiona Ctrl+C para detenerlo y volver al menú
echo ════════════════════════════════════════════
echo.

python -m http.server 8000

echo.
echo [INFO] Servidor detenido.
timeout /t 2 > nul
goto MENU

:DETENER
call logger.bat "STOP" "Deteniendo servidor manualmente"
cls
echo ════════════════════════════════════════════
echo  DETENIENDO SERVIDOR...
echo ════════════════════════════════════════════
echo.

taskkill /F /IM python.exe /FI "WINDOWTITLE eq MuzicMania*" 2>nul
if %errorlevel%==0 (
    echo ✓ Servidor detenido correctamente.
) else (
    echo ! No se encontró ningún servidor en ejecución.
)

echo.
timeout /t 2 > nul
goto MENU

:REINICIAR
call logger.bat "RESTART" "Solicitado reinicio del servidor"
cls
echo ════════════════════════════════════════════
echo  REINICIANDO SERVIDOR...
echo ════════════════════════════════════════════
echo.

REM Detener servidor actual
taskkill /F /IM python.exe 2>nul
if %errorlevel%==0 (
    echo ✓ Servidor anterior detenido.
) else (
    echo [INFO] No había servidor en ejecución.
)

timeout /t 1 > nul

REM Iniciar servidor con nuevo cache
goto INICIAR

:SALIR
call logger.bat "EXIT" "Cerrando panel de servidor"
cls
echo ════════════════════════════════════════════
echo  Cerrando...
echo ════════════════════════════════════════════
timeout /t 1 > nul
exit
