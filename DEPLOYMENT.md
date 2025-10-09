# Qasr Alsultan Dashboard - Deployment Guide

This guide will help you deploy the Qasr Alsultan Dashboard on your Hostinger VPS using Docker, Docker Compose, and Nginx.

## 📋 Prerequisites

### Server Requirements

- **OS**: Ubuntu 20.04+ or CentOS 8+
- **RAM**: Minimum 2GB (4GB recommended)
- **Storage**: Minimum 20GB free space
- **CPU**: 2+ cores recommended
- **Domain**: Your domain name pointed to the server IP

### Software Requirements

- Docker Engine (20.10+)
- Docker Compose (2.0+)
- Git
- Nginx (installed via Docker)

## 🚀 Quick Start Deployment

### Step 1: Connect to Your VPS

```bash
ssh root@your-server-ip
# or
ssh your-username@your-server-ip
```

### Step 2: Install Docker and Docker Compose

#### For Ubuntu/Debian:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again to apply group changes
exit
```

#### For CentOS/RHEL:

```bash
# Install Docker
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again
exit
```

### Step 3: Clone the Project

```bash
# Clone your project (replace with your actual repository URL)
git clone https://github.com/your-username/qasr-alsultan-dashboard.git
cd qasr-alsultan-dashboard

# Make scripts executable
chmod +x scripts/*.sh
```

### Step 4: Configure Environment Variables

```bash
# Copy the environment template
cp env.example .env

# Edit the environment file
nano .env
```

**Important Environment Variables to Configure:**

```env
# Application Settings
NODE_ENV=production
PORT=3000

# Database Configuration
DATABASE_URL=mongodb://qasr_admin:your_secure_password@mongo:27017/qasr_alsultan_db
MONGO_USERNAME=qasr_admin
MONGO_PASSWORD=your_secure_password_here
MONGO_DATABASE=qasr_alsultan_db

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_super_secret_nextauth_key_here_minimum_32_characters

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name

# SSL Configuration
DOMAIN_NAME=your-domain.com
EMAIL=your-email@domain.com
```

### Step 5: Deploy the Application

```bash
# Run the deployment script
./scripts/deploy.sh
```

This script will:

- Check dependencies
- Create necessary directories
- Build and start all services
- Wait for services to be ready
- Set up SSL certificate (if domain is configured)

### Step 6: Set Up SSL Certificate (Optional)

If you didn't configure the domain in the deployment script:

```bash
# Edit your .env file to set the domain
nano .env

# Set up SSL certificate
./scripts/setup-ssl.sh
```

## 🔧 Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Create necessary directories
mkdir -p certbot/conf certbot/www mongo-init logs/nginx logs/app

# Build and start services
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

## 📊 Monitoring and Management

### View Service Status

```bash
docker-compose ps
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f nextjs-app
docker-compose logs -f nginx
docker-compose logs -f mongo
```

### Update Application

```bash
# Update to latest version
./scripts/update.sh

# Or manually
git pull
docker-compose down
docker-compose up -d --build
```

### Backup Data

```bash
# Create backup
./scripts/update.sh backup

# Manual backup
docker-compose exec mongo mongodump --out /data/backup
```

## 🔒 Security Considerations

### Firewall Configuration

```bash
# Install UFW (Ubuntu)
sudo apt install ufw

# Configure firewall
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### SSL/TLS Security

- The deployment includes automatic SSL certificate renewal
- Certificates are obtained from Let's Encrypt
- HTTPS redirect is enabled by default

### Database Security

- MongoDB is not exposed to external ports
- Strong passwords are required
- Database runs in isolated Docker network

## 🛠️ Troubleshooting

### Common Issues

#### 1. Services Won't Start

```bash
# Check logs
docker-compose logs

# Check if ports are in use
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Stop conflicting services
sudo systemctl stop apache2  # if Apache is running
sudo systemctl stop nginx    # if system nginx is running
```

#### 2. SSL Certificate Issues

```bash
# Check certificate status
docker-compose run --rm certbot certificates

# Renew certificate manually
docker-compose run --rm certbot renew --force-renewal
```

#### 3. Database Connection Issues

```bash
# Check MongoDB logs
docker-compose logs mongo

# Connect to MongoDB directly
docker-compose exec mongo mongosh
```

#### 4. Application Not Accessible

```bash
# Check if application is running
curl http://localhost/api/health

# Check nginx configuration
docker-compose exec nginx nginx -t

# Reload nginx
docker-compose restart nginx
```

### Performance Optimization

#### 1. Increase Server Resources

- Add more RAM (4GB+ recommended)
- Use SSD storage
- Enable swap if needed

#### 2. Optimize Docker

```bash
# Clean up unused Docker resources
docker system prune -a

# Monitor resource usage
docker stats
```

#### 3. Database Optimization

```bash
# Create indexes in MongoDB
docker-compose exec mongo mongosh
use qasr_alsultan_db
db.users.createIndex({email: 1})
db.products.createIndex({slugEn: 1})
db.products.createIndex({slugAr: 1})
```

## 📈 Scaling and Production Considerations

### Load Balancing

For high traffic, consider:

- Multiple application instances
- Load balancer (HAProxy, Nginx)
- Database clustering
- CDN for static assets

### Monitoring

Set up monitoring for:

- Application health
- Database performance
- Server resources
- SSL certificate expiration

### Backup Strategy

- Regular database backups
- Configuration backups
- Automated backup scripts
- Off-site backup storage

## 🔄 Maintenance Tasks

### Daily

- Monitor application logs
- Check service health
- Verify SSL certificate status

### Weekly

- Update system packages
- Clean up Docker resources
- Review security logs

### Monthly

- Update application dependencies
- Review and rotate secrets
- Test backup and recovery procedures

## 📞 Support

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables in `.env`
3. Ensure all services are running: `docker-compose ps`
4. Check server resources: `htop` or `free -h`

## 🎉 Success!

Once deployed successfully, your application will be available at:

- **HTTP**: `http://your-domain.com`
- **HTTPS**: `https://your-domain.com` (after SSL setup)

The deployment includes:

- ✅ Next.js application
- ✅ MongoDB database
- ✅ Nginx reverse proxy
- ✅ SSL/TLS encryption
- ✅ Automatic certificate renewal
- ✅ Health checks and monitoring
- ✅ Production-ready configuration

Your Qasr Alsultan Dashboard is now ready for production use!
