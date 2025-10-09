#!/bin/bash

# Quick Deployment Script for Troubleshooting
# This script provides a minimal deployment for testing

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

echo "========================================"
echo "Quick Deployment for Troubleshooting"
echo "========================================"
echo

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if .env exists
    if [ ! -f ".env" ]; then
        log_error ".env file not found!"
        log_info "Creating .env from template..."
        cp env.example .env
        log_warning "Please edit .env file with your configuration:"
        log_info "nano .env"
        log_info "Then run this script again."
        exit 1
    fi
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        log_error "Docker not installed!"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        log_error "Docker Compose not installed!"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Create minimal directories
create_directories() {
    log_info "Creating necessary directories..."
    mkdir -p certbot/conf certbot/www mongo-init logs/nginx logs/app
    log_success "Directories created"
}

# Stop any existing services
stop_existing() {
    log_info "Stopping existing services..."
    docker-compose down 2>/dev/null || true
    log_success "Existing services stopped"
}

# Build and start services
start_services() {
    log_info "Building and starting services..."
    
    # Pull images
    docker-compose pull
    
    # Build and start
    docker-compose up -d --build
    
    log_success "Services started"
}

# Wait for services
wait_for_services() {
    log_info "Waiting for services to be ready..."
    
    # Wait for MongoDB
    log_info "Waiting for MongoDB..."
    timeout 60 bash -c 'until docker-compose exec mongo mongosh --eval "db.runCommand(\"ping\")" > /dev/null 2>&1; do sleep 2; done' || {
        log_warning "MongoDB health check timeout - continuing anyway"
    }
    
    # Wait for Next.js app
    log_info "Waiting for Next.js application..."
    timeout 60 bash -c 'until curl -f http://localhost:3000/api/health > /dev/null 2>&1; do sleep 2; done' || {
        log_warning "Next.js health check timeout - continuing anyway"
    }
    
    log_success "Services are ready"
}

# Test endpoints
test_endpoints() {
    log_info "Testing endpoints..."
    
    # Test local endpoints
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        log_success "Next.js app responding on port 3000"
    else
        log_error "Next.js app not responding on port 3000"
    fi
    
    if curl -f http://localhost/api/health > /dev/null 2>&1; then
        log_success "Nginx proxy responding on port 80"
    else
        log_warning "Nginx proxy not responding on port 80"
    fi
}

# Show status
show_status() {
    log_info "Service Status:"
    echo
    docker-compose ps
    echo
    
    log_info "Service URLs:"
    echo "  Direct Next.js: http://localhost:3000"
    echo "  Via Nginx:      http://localhost"
    
    if [ -f ".env" ] && grep -q "DOMAIN_NAME=" .env; then
        DOMAIN_NAME=$(grep "DOMAIN_NAME=" .env | cut -d'=' -f2)
        if [ "$DOMAIN_NAME" != "your-domain.com" ]; then
            echo "  Domain:         http://$DOMAIN_NAME"
        fi
    fi
    
    echo
    log_info "Useful commands:"
    echo "  View logs:           docker-compose logs -f"
    echo "  Stop services:       docker-compose down"
    echo "  Restart services:    docker-compose restart"
    echo "  Check status:        docker-compose ps"
    echo
}

# Main deployment
main() {
    check_prerequisites
    echo
    
    create_directories
    echo
    
    stop_existing
    echo
    
    start_services
    echo
    
    wait_for_services
    echo
    
    test_endpoints
    echo
    
    show_status
    
    log_success "Quick deployment completed!"
    log_info "If services are running, your app should be accessible at http://localhost"
}

# Run main function
main "$@"
