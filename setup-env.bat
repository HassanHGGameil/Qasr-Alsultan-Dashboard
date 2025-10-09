@echo off
REM Environment Setup Script for Qasr Alsultan Dashboard (Windows)
REM This script helps you set up your environment configuration

echo ========================================
echo Environment Setup for Qasr Alsultan Dashboard
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
echo ========================================
echo Environment Configuration Summary
echo ========================================
echo.
echo Your .env file has been configured with:
echo   ✓ Domain: markupagency.net
echo   ✓ Email: hgprand@gmail.com
echo   ✓ Cloudinary credentials (already configured)
echo.
echo IMPORTANT: You need to set secure passwords and secrets!
echo.
echo Please edit your .env file and update these values:
echo.
echo 1. MONGO_PASSWORD - Set a secure password for MongoDB
echo 2. NEXTAUTH_SECRET - Generate a secure secret key
echo 3. JWT_SECRET - Generate a secure JWT secret
echo.
echo You can use online generators or run this command to generate secrets:
echo   openssl rand -base64 32
echo.
echo Next steps:
echo 1. Edit .env file: notepad .env
echo 2. Make sure your domain DNS points to your server IP
echo 3. Run deployment: deploy.bat
echo.
echo WARNING: Keep your .env file secure and never commit it to version control!
echo.

pause
