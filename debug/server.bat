@echo off
cd /d "%~dp0"
chcp 65001 > nul
setlocal enabledelayedexpansion

:: Get ESC character for ANSI colors
for /f "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do set ESC=%%b

:: Custom Colors
set C_PURPLE=%ESC%[38;2;180;0;255m
set C_CYAN=%ESC%[38;2;0;255;255m
set C_WHITE=%ESC%[97m
set C_GRAY=%ESC%[90m
set C_RESET=%ESC%[0m

:: Window Title & Size
title MuzicMania - Command Center
mode con: cols=90 lines=30
goto MENU

:BANNER
cls
echo.
echo.
echo    %C_PURPLE%███╗   ███╗██╗   ██╗███████╗██╗ ██████╗███╗   ███╗ █████╗ ███╗   ██╗██╗ █████╗ %C_RESET%
echo    %C_PURPLE%████╗ ████║██║   ██║╚══███╔╝██║██╔════╝████╗ ████║██╔══██╗████╗  ██║██║██╔══██╗%C_RESET%
echo    %C_PURPLE%██╔████╔██║██║   ██║  ███╔╝ ██║██║     ██╔████╔██║███████║██╔██╗ ██║██║███████║%C_RESET%
echo    %C_PURPLE%██║╚██╔╝██║██║   ██║ ███╔╝  ██║██║     ██║╚██╔╝██║██╔══██║██║╚██╗██║██║██╔══██║%C_RESET%
echo    %C_PURPLE%██║ ╚═╝ ██║╚██████╔╝███████╗██║╚██████╗██║ ╚═╝ ██║██║  ██║██║ ╚████║██║██║  ██║%C_RESET%
echo    %C_PURPLE%╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝%C_RESET%
echo.
echo    %C_GRAY%══════════════════════════════════════════════════════════════════════════════════%C_RESET%
echo.
exit /b 0

:MENU
call :BANNER
echo        %C_WHITE%[%C_CYAN%1%C_WHITE%]  INICIAR SERVIDOR    %C_GRAY%» Puerto 8000 + Logs + Cache Busting%C_RESET%
echo        %C_WHITE%[%C_CYAN%2%C_WHITE%]  DETENER SERVIDOR    %C_GRAY%» Detener procesos Python activos%C_RESET%
echo        %C_WHITE%[%C_CYAN%3%C_WHITE%]  REINICIAR SERVIDOR  %C_GRAY%» Limpieza profunda y arranque%C_RESET%
echo        %C_WHITE%[%C_CYAN%4%C_WHITE%]  SALIR               %C_GRAY%» Cerrar este panel%C_RESET%
echo.
echo    %C_GRAY%══════════════════════════════════════════════════════════════════════════════════%C_RESET%
echo.
set /p opcion="  %C_PURPLE%»%C_RESET% Selecciona una opción: "

if "%opcion%"=="1" goto INICIAR
if "%opcion%"=="2" goto DETENER
if "%opcion%"=="3" goto REINICIAR
if "%opcion%"=="4" goto SALIR
goto MENU

:INICIAR
call :BANNER
echo    %C_PURPLE%[*APLICANDO CONFIGURACIÓN...]%C_RESET%
echo.
:: Iniciar el script de Python directamente
python server.py
:: Al terminar (Ctrl+C), volver al menu
goto MENU

:DETENER
call :BANNER
echo    %C_PURPLE%[DETENIENDO SERVICIOS...]%C_RESET%
echo.
taskkill /F /IM python.exe /FI "WINDOWTITLE eq MuzicMania*" 2>nul
taskkill /F /IM python.exe 2>nul
echo    %C_CYAN%✓%C_RESET% Servidor detenido correctamente.
timeout /t 2 > nul
goto MENU

:REINICIAR
call :BANNER
echo    %C_PURPLE%[REINICIANDO SISTEMA...]%C_RESET%
echo.
taskkill /F /IM python.exe 2>nul
timeout /t 1 > nul
goto INICIAR

:SALIR
exit
