#!/bin/bash

# Qasr Alsultan Dashboard - Deployment Script
# This script handles the deployment process on your Hostinger VPS

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="qasr-alsultan-dashboard"
DOMAIN_NAME="${DOMAIN_NAME:-your-domain.com}"
EMAIL="${EMAIL:-admin@your-domain.com}"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        log_error "This script should not be run as root for security reasons"
        exit 1
    fi
}

# Check if Docker and Docker Compose are installed
check_dependencies() {
    log_info "Checking dependencies..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    log_success "All dependencies are installed"
}

# Check if .env file exists
check_env() {
    if [ ! -f ".env" ]; then
        log_error ".env file not found!"
        log_info "Please copy env.example to .env and configure your environment variables:"
        log_info "cp env.example .env"
        log_info "nano .env"
        exit 1
    fi
    
    log_success ".env file found"
}

# Create necessary directories
create_directories() {
    log_info "Creating necessary directories..."
    
    mkdir -p certbot/conf
    mkdir -p certbot/www
    mkdir -p mongo-init
    mkdir -p logs/nginx
    mkdir -p logs/app
    
    log_success "Directories created"
}

# Build and start services
deploy_services() {
    log_info "Building and starting services..."
    
    # Stop existing containers
    docker-compose down || true
    
    # Pull latest images
    docker-compose pull
    
    # Build and start services
    docker-compose up -d --build
    
    log_success "Services started successfully"
}

# Wait for services to be ready
wait_for_services() {
    log_info "Waiting for services to be ready..."
    
    # Wait for MongoDB
    log_info "Waiting for MongoDB..."
    timeout 60 bash -c 'until docker-compose exec mongo mongosh --eval "db.runCommand(\"ping\")" > /dev/null 2>&1; do sleep 2; done'
    
    # Wait for Next.js app
    log_info "Waiting for Next.js application..."
    timeout 60 bash -c 'until curl -f http://localhost/api/health > /dev/null 2>&1; do sleep 2; done'
    
    log_success "All services are ready"
}

# Setup SSL certificate
setup_ssl() {
    if [ "$DOMAIN_NAME" != "your-domain.com" ]; then
        log_info "Setting up SSL certificate for $DOMAIN_NAME..."
        
        # Run initial certificate request
        docker-compose run --rm certbot certonly \
            --webroot \
            --webroot-path=/var/www/certbot \
            --email $EMAIL \
            --agree-tos \
            --no-eff-email \
            -d $DOMAIN_NAME \
            -d www.$DOMAIN_NAME
        
        if [ $? -eq 0 ]; then
            log_success "SSL certificate obtained successfully"
            
            # Update nginx configuration to enable HTTPS
            sed -i 's/# location \/ {/location \/ {/' nginx/conf.d/default.conf
            sed -i 's/location \/ {/location \/ {\n        return 301 https:\/\/$host$request_uri;\n    }\n\n    # Remove the redirect above and use this for initial testing\n    location \/ {/' nginx/conf.d/default.conf
            
            # Reload nginx
            docker-compose restart nginx
            
            log_success "HTTPS redirect enabled"
        else
            log_warning "SSL certificate setup failed. You can set it up later manually."
        fi
    else
        log_warning "Domain not configured. Skipping SSL setup."
        log_info "To setup SSL later, run: ./scripts/setup-ssl.sh"
    fi
}

# Show deployment status
show_status() {
    log_info "Deployment Status:"
    echo ""
    docker-compose ps
    echo ""
    
    log_info "Service URLs:"
    echo "HTTP:  http://$DOMAIN_NAME"
    if [ "$DOMAIN_NAME" != "your-domain.com" ]; then
        echo "HTTPS: https://$DOMAIN_NAME"
    fi
    echo ""
    
    log_info "Useful commands:"
    echo "  View logs:           docker-compose logs -f"
    echo "  Stop services:       docker-compose down"
    echo "  Restart services:    docker-compose restart"
    echo "  Update services:     ./scripts/update.sh"
    echo ""
}

# Main deployment function
main() {
    log_info "Starting deployment of $PROJECT_NAME..."
    
    check_root
    check_dependencies
    check_env
    create_directories
    deploy_services
    wait_for_services
    setup_ssl
    show_status
    
    log_success "Deployment completed successfully!"
    log_info "Your application should now be accessible at http://$DOMAIN_NAME"
}

# Run main function
main "$@"
