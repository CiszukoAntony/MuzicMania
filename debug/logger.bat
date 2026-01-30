@echo off
setlocal enabledelayedexpansion

:: Logger for MuzicMania
:: Usage: logger.bat "ACTION" "MESSAGE"

set ACTION=%~1
set MESSAGE=%~2

:: Get Date and Time (Format: YYYY-MM-DD HH:MM:SS)
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set YEAR=!datetime:~0,4!
set MONTH=!datetime:~4,2!
set DAY=!datetime:~6,2!
set HOUR=!datetime:~8,2!
set MINUTE=!datetime:~10,2!
set SECOND=!datetime:~12,2!

set TIMESTAMP=!YEAR!-!MONTH!-!DAY! !HOUR!:!MINUTE!:!SECOND!
set DATE_STAMP=!YEAR!-!MONTH!-!DAY!

:: Create persistent random ID for the session if not exists
:: We use a temporary file to store the random ID for the day or session
if not defined LOG_RANDOM (
    set /a LOG_RANDOM=%RANDOM%
)

set LOG_FILE=..\logs\!LOG_RANDOM!_!DATE_STAMP!.txt

:: Ensure logs directory exists (just in case)
if not exist "..\logs" mkdir "..\logs"

:: Append to log
echo [!TIMESTAMP!] [!ACTION!] !MESSAGE! >> "!LOG_FILE!"

endlocal
