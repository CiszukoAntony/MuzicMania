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

:: Persist ID for the current session (window)
:: If SESSION_ID is passed as environment variable, use it.
:: Otherwise generate one (fallback)
if "%LOG_SESSION_ID%"=="" (
    set LOG_SESSION_ID=%RANDOM%
)

set LOG_FILE=..\logs\_log_!LOG_SESSION_ID!_!DATE_STAMP!.txt

:: Ensure logs directory exists
if not exist "..\logs" mkdir "..\logs"

:: Append to log
echo [!TIMESTAMP!] [!ACTION!] !MESSAGE! >> "!LOG_FILE!"

endlocal
