#!/bin/bash

# Environment Setup Script for Qasr Alsultan Dashboard
# This script helps you set up your environment configuration

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

# Check if .env already exists
if [ -f ".env" ]; then
    log_warning ".env file already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Keeping existing .env file"
        exit 0
    fi
fi

# Copy env.example to .env
log_info "Copying env.example to .env..."
cp env.example .env

log_success ".env file created successfully!"

# Prompt for missing values
log_info "Now let's configure the missing values..."

# Generate random secrets
NEXTAUTH_SECRET=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)
MONGO_PASSWORD=$(openssl rand -base64 16 | tr -d "=+/" | cut -c1-16)

# Update .env file with generated secrets
sed -i.bak "s/your_super_secret_nextauth_key_here_minimum_32_characters/$NEXTAUTH_SECRET/" .env
sed -i.bak "s/your_jwt_secret_key_here_minimum_32_characters/$JWT_SECRET/" .env
sed -i.bak "s/your_secure_password_here/$MONGO_PASSWORD/" .env

# Update DATABASE_URL with the generated password
sed -i.bak "s/your_secure_password/$MONGO_PASSWORD/" .env

# Clean up backup files
rm .env.bak

log_success "Environment configuration completed!"
echo ""
log_info "Your .env file has been configured with:"
echo "  ✓ Domain: markupagency.net"
echo "  ✓ Email: hgprand@gmail.com"
echo "  ✓ Cloudinary credentials (already configured)"
echo "  ✓ Generated secure secrets for authentication"
echo "  ✓ Generated secure MongoDB password"
echo ""
log_info "Next steps:"
echo "  1. Review your .env file: nano .env"
echo "  2. Make sure your domain DNS points to your server IP"
echo "  3. Run deployment: ./scripts/deploy.sh"
echo ""
log_warning "Important: Keep your .env file secure and never commit it to version control!"
