@echo off
REM Qasr Alsultan Dashboard - Windows Deployment Script
REM This script helps deploy the application on Windows before uploading to VPS

echo ========================================
echo Qasr Alsultan Dashboard Deployment
echo ========================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed or not in PATH
    echo Please install Docker Desktop first
    pause
    exit /b 1
)

REM Check if Docker Compose is available
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    docker compose version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ERROR: Docker Compose is not installed
        echo Please install Docker Compose first
        pause
        exit /b 1
    )
)

echo Docker and Docker Compose are installed ✓

REM Check if .env file exists
if not exist ".env" (
    echo ERROR: .env file not found!
    echo Please copy env.example to .env and configure your settings:
    echo copy env.example .env
    echo notepad .env
    pause
    exit /b 1
)

echo Environment file found ✓

REM Create necessary directories
if not exist "certbot\conf" mkdir certbot\conf
if not exist "certbot\www" mkdir certbot\www
if not exist "mongo-init" mkdir mongo-init
if not exist "logs\nginx" mkdir logs\nginx
if not exist "logs\app" mkdir logs\app

echo Directories created ✓

REM Build and start services
echo Building and starting services...
docker-compose down
docker-compose up -d --build

if %errorlevel% neq 0 (
    echo ERROR: Failed to start services
    pause
    exit /b 1
)

echo Services started successfully ✓

REM Wait a moment for services to start
timeout /t 10 /nobreak >nul

REM Check service status
echo.
echo Service Status:
docker-compose ps

echo.
echo ========================================
echo Deployment completed successfully!
echo ========================================
echo.
echo Your application should be accessible at:
echo - http://localhost (if nginx is running)
echo - http://localhost:3000 (direct Next.js access)
echo.
echo Useful commands:
echo - View logs: docker-compose logs -f
echo - Stop services: docker-compose down
echo - Restart services: docker-compose restart
echo.
echo Next steps:
echo 1. Upload this entire project to your VPS
echo 2. Configure your domain in .env file
echo 3. Run the Linux deployment script on your VPS
echo.

pause
