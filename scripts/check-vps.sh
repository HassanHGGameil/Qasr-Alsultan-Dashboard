#!/bin/bash

# VPS Diagnostic Script for Qasr Alsultan Dashboard
# This script helps diagnose common deployment issues

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
    echo -e "${GREEN}[✓]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
}

echo "========================================"
echo "VPS Diagnostic Check for Qasr Alsultan Dashboard"
echo "========================================"
echo

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        log_warning "Running as root (not recommended for security)"
    else
        log_success "Running as non-root user"
    fi
}

# Check Docker installation
check_docker() {
    log_info "Checking Docker installation..."
    
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version)
        log_success "Docker installed: $DOCKER_VERSION"
        
        # Check if Docker daemon is running
        if docker info &> /dev/null; then
            log_success "Docker daemon is running"
        else
            log_error "Docker daemon is not running"
            log_info "Try: sudo systemctl start docker"
            return 1
        fi
    else
        log_error "Docker is not installed"
        log_info "Install with: curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh"
        return 1
    fi
}

# Check Docker Compose
check_docker_compose() {
    log_info "Checking Docker Compose..."
    
    if command -v docker-compose &> /dev/null; then
        COMPOSE_VERSION=$(docker-compose --version)
        log_success "Docker Compose installed: $COMPOSE_VERSION"
    elif docker compose version &> /dev/null; then
        COMPOSE_VERSION=$(docker compose version)
        log_success "Docker Compose (plugin) installed: $COMPOSE_VERSION"
    else
        log_error "Docker Compose is not installed"
        log_info "Install with: sudo curl -L \"https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose"
        return 1
    fi
}

# Check project files
check_project_files() {
    log_info "Checking project files..."
    
    local required_files=("docker-compose.yml" "env.example" "scripts/deploy.sh")
    local missing_files=()
    
    for file in "${required_files[@]}"; do
        if [ -f "$file" ]; then
            log_success "Found: $file"
        else
            log_error "Missing: $file"
            missing_files+=("$file")
        fi
    done
    
    if [ ${#missing_files[@]} -gt 0 ]; then
        log_error "Missing required files. Make sure you're in the project directory."
        return 1
    fi
}

# Check .env file
check_env_file() {
    log_info "Checking environment configuration..."
    
    if [ -f ".env" ]; then
        log_success ".env file exists"
        
        # Check for required variables
        if grep -q "DOMAIN_NAME=" .env; then
            DOMAIN_NAME=$(grep "DOMAIN_NAME=" .env | cut -d'=' -f2)
            log_success "Domain configured: $DOMAIN_NAME"
        else
            log_warning "DOMAIN_NAME not configured in .env"
        fi
        
        if grep -q "NEXTAUTH_URL=" .env; then
            log_success "NEXTAUTH_URL configured"
        else
            log_warning "NEXTAUTH_URL not configured in .env"
        fi
        
        if grep -q "your_secure_password" .env; then
            log_warning "Default passwords detected - please update them in .env"
        else
            log_success "Custom passwords configured"
        fi
    else
        log_error ".env file not found"
        log_info "Copy env.example to .env and configure: cp env.example .env"
        return 1
    fi
}

# Check domain DNS
check_dns() {
    log_info "Checking domain DNS..."
    
    if [ -f ".env" ] && grep -q "DOMAIN_NAME=" .env; then
        DOMAIN_NAME=$(grep "DOMAIN_NAME=" .env | cut -d'=' -f2)
        
        if [ "$DOMAIN_NAME" != "your-domain.com" ]; then
            # Get current server IP
            SERVER_IP=$(curl -s ifconfig.me || curl -s ipinfo.io/ip || hostname -I | awk '{print $1}')
            log_info "Server IP: $SERVER_IP"
            
            # Check DNS resolution
            DOMAIN_IP=$(nslookup $DOMAIN_NAME 2>/dev/null | grep -A1 "Name:" | tail -1 | awk '{print $2}')
            
            if [ -n "$DOMAIN_IP" ]; then
                log_info "Domain $DOMAIN_NAME resolves to: $DOMAIN_IP"
                if [ "$DOMAIN_IP" = "$SERVER_IP" ]; then
                    log_success "DNS correctly points to this server"
                else
                    log_warning "DNS points to different IP ($DOMAIN_IP) - update DNS records"
                fi
            else
                log_error "Could not resolve $DOMAIN_NAME"
            fi
        else
            log_warning "Domain not configured in .env file"
        fi
    fi
}

# Check ports
check_ports() {
    log_info "Checking port availability..."
    
    # Check if ports 80 and 443 are in use
    if netstat -tuln 2>/dev/null | grep -q ":80 "; then
        log_warning "Port 80 is in use"
        netstat -tulpn 2>/dev/null | grep ":80 " || true
    else
        log_success "Port 80 is available"
    fi
    
    if netstat -tuln 2>/dev/null | grep -q ":443 "; then
        log_warning "Port 443 is in use"
        netstat -tulpn 2>/dev/null | grep ":443 " || true
    else
        log_success "Port 443 is available"
    fi
}

# Check Docker services
check_services() {
    log_info "Checking Docker services..."
    
    if [ -f "docker-compose.yml" ]; then
        # Check if services are running
        if docker-compose ps 2>/dev/null | grep -q "Up"; then
            log_success "Docker services are running:"
            docker-compose ps
        else
            log_warning "No Docker services running"
            log_info "Start services with: docker-compose up -d"
        fi
    fi
}

# Check firewall
check_firewall() {
    log_info "Checking firewall status..."
    
    if command -v ufw &> /dev/null; then
        UFW_STATUS=$(sudo ufw status 2>/dev/null || echo "inactive")
        if [[ $UFW_STATUS == *"inactive"* ]]; then
            log_warning "UFW firewall is inactive"
        else
            log_info "UFW firewall status:"
            echo "$UFW_STATUS"
        fi
    fi
    
    if command -v iptables &> /dev/null; then
        IPTABLES_RULES=$(sudo iptables -L 2>/dev/null | wc -l)
        if [ $IPTABLES_RULES -gt 8 ]; then
            log_info "iptables has $IPTABLES_RULES rules configured"
        fi
    fi
}

# Check system resources
check_resources() {
    log_info "Checking system resources..."
    
    # Check disk space
    DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ $DISK_USAGE -gt 90 ]; then
        log_error "Disk usage is high: ${DISK_USAGE}%"
    elif [ $DISK_USAGE -gt 80 ]; then
        log_warning "Disk usage is moderate: ${DISK_USAGE}%"
    else
        log_success "Disk usage is good: ${DISK_USAGE}%"
    fi
    
    # Check memory
    if command -v free &> /dev/null; then
        MEMORY_USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
        if [ $MEMORY_USAGE -gt 90 ]; then
            log_error "Memory usage is high: ${MEMORY_USAGE}%"
        elif [ $MEMORY_USAGE -gt 80 ]; then
            log_warning "Memory usage is moderate: ${MEMORY_USAGE}%"
        else
            log_success "Memory usage is good: ${MEMORY_USAGE}%"
        fi
    fi
}

# Main diagnostic function
main() {
    echo "Starting diagnostic checks..."
    echo
    
    check_root
    echo
    
    if check_docker; then
        echo
    else
        log_error "Docker issues detected. Please fix Docker installation first."
        exit 1
    fi
    
    if check_docker_compose; then
        echo
    else
        log_error "Docker Compose issues detected. Please fix Docker Compose installation first."
        exit 1
    fi
    
    check_project_files
    echo
    
    check_env_file
    echo
    
    check_dns
    echo
    
    check_ports
    echo
    
    check_services
    echo
    
    check_firewall
    echo
    
    check_resources
    echo
    
    echo "========================================"
    echo "Diagnostic check completed!"
    echo "========================================"
    echo
    
    log_info "If all checks passed, try deploying with:"
    echo "  ./scripts/deploy.sh"
    echo
    
    log_info "If issues were found, fix them and run this script again."
}

# Run main function
main "$@"
