#!/bin/bash

# SSL Certificate Setup Script for Qasr Alsultan Dashboard
# This script helps you obtain and configure SSL certificates

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Load environment variables
if [ -f ".env" ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

DOMAIN_NAME="${DOMAIN_NAME:-your-domain.com}"
EMAIL="${EMAIL:-admin@your-domain.com}"

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

# Check if domain is configured
check_domain() {
    if [ "$DOMAIN_NAME" = "your-domain.com" ]; then
        log_error "Domain not configured!"
        log_info "Please set your domain in the .env file:"
        log_info "DOMAIN_NAME=your-actual-domain.com"
        log_info "EMAIL=your-email@domain.com"
        exit 1
    fi
    
    log_info "Setting up SSL for domain: $DOMAIN_NAME"
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

# Request SSL certificate
request_certificate() {
    log_info "Requesting SSL certificate from Let's Encrypt..."
    
    docker-compose run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --force-renewal \
        -d $DOMAIN_NAME \
        -d www.$DOMAIN_NAME
    
    if [ $? -eq 0 ]; then
        log_success "SSL certificate obtained successfully"
    else
        log_error "Failed to obtain SSL certificate"
        exit 1
    fi
}

# Update nginx configuration for HTTPS
update_nginx_config() {
    log_info "Updating nginx configuration for HTTPS..."
    
    # Backup original config
    cp nginx/conf.d/default.conf nginx/conf.d/default.conf.backup
    
    # Enable HTTPS redirect
    sed -i 's/# location \/ {/location \/ {\n        return 301 https:\/\/$host$request_uri;\n    }\n\n    # Remove the redirect above and use this for initial testing\n    location \/ {/' nginx/conf.d/default.conf
    
    # Uncomment HTTPS server block
    sed -i 's/^# server {/server {/' nginx/conf.d/default.conf
    sed -i 's/^#     listen 443/    listen 443/' nginx/conf.d/default.conf
    sed -i 's/^#     listen \[::\]:443/    listen [::]:443/' nginx/conf.d/default.conf
    sed -i 's/^#     server_name/    server_name/' nginx/conf.d/default.conf
    sed -i 's/^#     ssl_certificate/    ssl_certificate/' nginx/conf.d/default.conf
    sed -i 's/^#     ssl_certificate_key/    ssl_certificate_key/' nginx/conf.d/default.conf
    sed -i 's/^#     ssl_protocols/    ssl_protocols/' nginx/conf.d/default.conf
    sed -i 's/^#     ssl_ciphers/    ssl_ciphers/' nginx/conf.d/default.conf
    sed -i 's/^#     ssl_prefer_server_ciphers/    ssl_prefer_server_ciphers/' nginx/conf.d/default.conf
    sed -i 's/^#     ssl_session_cache/    ssl_session_cache/' nginx/conf.d/default.conf
    sed -i 's/^#     ssl_session_timeout/    ssl_session_timeout/' nginx/conf.d/default.conf
    sed -i 's/^#     ssl_stapling/    ssl_stapling/' nginx/conf.d/default.conf
    sed -i 's/^#     ssl_stapling_verify/    ssl_stapling_verify/' nginx/conf.d/default.conf
    
    # Uncomment location blocks in HTTPS server
    sed -i 's/^#     location \//    location \//' nginx/conf.d/default.conf
    sed -i 's/^#         proxy_pass/        proxy_pass/' nginx/conf.d/default.conf
    sed -i 's/^#         proxy_http_version/        proxy_http_version/' nginx/conf.d/default.conf
    sed -i 's/^#         proxy_set_header/        proxy_set_header/' nginx/conf.d/default.conf
    sed -i 's/^#         proxy_cache_bypass/        proxy_cache_bypass/' nginx/conf.d/default.conf
    
    # Remove closing brace comments
    sed -i 's/^# }/}/' nginx/conf.d/default.conf
    
    log_success "Nginx configuration updated"
}

# Reload nginx
reload_nginx() {
    log_info "Reloading nginx configuration..."
    
    docker-compose restart nginx
    
    log_success "Nginx reloaded successfully"
}

# Test SSL configuration
test_ssl() {
    log_info "Testing SSL configuration..."
    
    sleep 5  # Wait for nginx to restart
    
    if curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN_NAME | grep -q "200"; then
        log_success "HTTPS is working correctly"
    else
        log_warning "HTTPS test failed. Please check the configuration manually."
    fi
}

# Show SSL status
show_ssl_status() {
    log_info "SSL Certificate Status:"
    echo ""
    
    if [ -d "certbot/conf/live/$DOMAIN_NAME" ]; then
        log_success "Certificate exists for $DOMAIN_NAME"
        
        # Show certificate details
        docker-compose run --rm certbot certificates
        
        echo ""
        log_info "Certificate files:"
        ls -la certbot/conf/live/$DOMAIN_NAME/
    else
        log_warning "No certificate found for $DOMAIN_NAME"
    fi
    
    echo ""
    log_info "Your site should now be accessible at:"
    echo "  HTTP:  http://$DOMAIN_NAME (redirects to HTTPS)"
    echo "  HTTPS: https://$DOMAIN_NAME"
}

# Main function
main() {
    log_info "Setting up SSL certificate for Qasr Alsultan Dashboard..."
    
    check_domain
    check_services
    request_certificate
    update_nginx_config
    reload_nginx
    test_ssl
    show_ssl_status
    
    log_success "SSL setup completed successfully!"
    log_info "Certificate will auto-renew every 12 hours"
}

# Run main function
main "$@"
