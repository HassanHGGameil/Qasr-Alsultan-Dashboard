#!/bin/bash

# Update Script for Qasr Alsultan Dashboard
# This script handles updating the application with zero downtime

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

# Check if services are running
check_services() {
    if ! docker-compose ps | grep -q "Up"; then
        log_error "Services are not running!"
        log_info "Please start the services first:"
        log_info "docker-compose up -d"
        exit 1
    fi
    
    log_success "Services are running"
}

# Backup current deployment
backup_current() {
    log_info "Creating backup of current deployment..."
    
    BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p $BACKUP_DIR
    
    # Backup environment file
    if [ -f ".env" ]; then
        cp .env $BACKUP_DIR/
    fi
    
    # Backup nginx config
    if [ -f "nginx/conf.d/default.conf" ]; then
        cp nginx/conf.d/default.conf $BACKUP_DIR/
    fi
    
    # Backup docker-compose logs
    docker-compose logs > $BACKUP_DIR/docker-compose.logs
    
    log_success "Backup created in $BACKUP_DIR"
}

# Pull latest code
pull_code() {
    log_info "Pulling latest code from repository..."
    
    if [ -d ".git" ]; then
        git pull origin main || git pull origin master
        log_success "Code updated from repository"
    else
        log_warning "Not a git repository, skipping code pull"
    fi
}

# Update Docker images
update_images() {
    log_info "Updating Docker images..."
    
    # Pull latest images
    docker-compose pull
    
    log_success "Docker images updated"
}

# Build and deploy new version
deploy_update() {
    log_info "Building and deploying new version..."
    
    # Build new version
    docker-compose build --no-cache
    
    # Deploy with zero downtime
    docker-compose up -d --remove-orphans
    
    log_success "New version deployed"
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

# Clean up old images
cleanup() {
    log_info "Cleaning up old Docker images..."
    
    # Remove unused images
    docker image prune -f
    
    # Remove old containers
    docker container prune -f
    
    log_success "Cleanup completed"
}

# Show update status
show_status() {
    log_info "Update Status:"
    echo ""
    docker-compose ps
    echo ""
    
    log_info "Service Health Check:"
    if curl -s -f http://localhost/api/health > /dev/null; then
        log_success "Application is healthy"
    else
        log_warning "Application health check failed"
    fi
    
    echo ""
    log_info "Recent logs:"
    docker-compose logs --tail=20
}

# Rollback function
rollback() {
    log_warning "Rolling back to previous version..."
    
    # Stop current services
    docker-compose down
    
    # Find latest backup
    LATEST_BACKUP=$(ls -t backups/ | head -1)
    
    if [ -n "$LATEST_BACKUP" ]; then
        log_info "Restoring from backup: $LATEST_BACKUP"
        
        # Restore environment
        if [ -f "backups/$LATEST_BACKUP/.env" ]; then
            cp "backups/$LATEST_BACKUP/.env" .
        fi
        
        # Restore nginx config
        if [ -f "backups/$LATEST_BACKUP/default.conf" ]; then
            cp "backups/$LATEST_BACKUP/default.conf" nginx/conf.d/
        fi
        
        # Start services
        docker-compose up -d
        
        log_success "Rollback completed"
    else
        log_error "No backup found for rollback"
        exit 1
    fi
}

# Main update function
main() {
    case "${1:-update}" in
        "update")
            log_info "Starting update process..."
            check_services
            backup_current
            pull_code
            update_images
            deploy_update
            wait_for_services
            cleanup
            show_status
            log_success "Update completed successfully!"
            ;;
        "rollback")
            rollback
            ;;
        "status")
            show_status
            ;;
        "backup")
            backup_current
            ;;
        *)
            echo "Usage: $0 [update|rollback|status|backup]"
            echo ""
            echo "Commands:"
            echo "  update   - Update the application (default)"
            echo "  rollback - Rollback to previous version"
            echo "  status   - Show current status"
            echo "  backup   - Create backup only"
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
