@echo off
REM Create .env file from env.example with your configuration

echo ========================================
echo Creating .env file for Qasr Alsultan Dashboard
echo ========================================

REM Check if .env already exists
if exist ".env" (
    echo WARNING: .env file already exists!
    set /p overwrite="Do you want to overwrite it? (y/N): "
    if /i not "%overwrite%"=="y" (
        echo Keeping existing .env file
        pause
        exit /b 0
    )
)

REM Copy env.example to .env
echo Copying env.example to .env...
copy env.example .env >nul

if %errorlevel% neq 0 (
    echo ERROR: Failed to copy env.example to .env
    pause
    exit /b 1
)

echo .env file created successfully!
echo.

REM Generate secure passwords
echo Generating secure passwords...

REM Create a temporary PowerShell script to generate secure passwords
echo $nexauth = [System.Web.Security.Membership]::GeneratePassword(32, 8) > temp_pw.ps1
echo $jwt = [System.Web.Security.Membership]::GeneratePassword(32, 8) >> temp_pw.ps1
echo $mongo = [System.Web.Security.Membership]::GeneratePassword(16, 4) >> temp_pw.ps1
echo Write-Host "NEXTAUTH_SECRET=$nexauth" >> temp_pw.ps1
echo Write-Host "JWT_SECRET=$jwt" >> temp_pw.ps1
echo Write-Host "MONGO_PASSWORD=$mongo" >> temp_pw.ps1

REM Run PowerShell script to generate passwords
for /f "tokens=*" %%i in ('powershell -ExecutionPolicy Bypass -File temp_pw.ps1') do set %%i

REM Clean up temporary file
del temp_pw.ps1

echo.
echo ========================================
echo Environment Configuration Summary
echo ========================================
echo.
echo Your .env file has been created with:
echo.
echo ✓ Domain: markupagency.net
echo ✓ Email: hgprand@gmail.com
echo ✓ Cloudinary credentials (configured)
echo ✓ Generated secure passwords:
echo   - NEXTAUTH_SECRET: %NEXTAUTH_SECRET%
echo   - JWT_SECRET: %JWT_SECRET%
echo   - MONGO_PASSWORD: %MONGO_PASSWORD%
echo.
echo The .env file contains your actual configuration:
echo   - DATABASE_URL=mongodb://qasr_admin:%MONGO_PASSWORD%@mongo:27017/qasr_alsultan_db
echo   - NEXTAUTH_URL=https://markupagency.net
echo   - DOMAIN_NAME=markupagency.net
echo   - EMAIL=hgprand@gmail.com
echo   - Cloudinary API keys (your actual credentials)
echo.
echo Next steps:
echo 1. Upload this entire project to your VPS
echo 2. Run the deployment script on your VPS
echo 3. Your app will be available at https://markupagency.net
echo.
echo WARNING: Keep your .env file secure and never commit it to version control!
echo.

pause
