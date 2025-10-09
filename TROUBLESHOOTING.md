# 🚨 Qasr Alsultan Dashboard - VPS Troubleshooting Guide

## Quick Diagnostic Checklist

### 1. ✅ VPS Setup Verification

**Connect to your VPS:**

```bash
ssh root@your-vps-ip
# or
ssh your-username@your-vps-ip
```

**Check if Docker is installed:**

```bash
docker --version
docker-compose --version
```

If not installed, run:

```bash
# For Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again
exit
```

### 2. ✅ Project Upload Verification

**Check if project files are uploaded:**

```bash
ls -la /path/to/your/project/
# Should see: docker-compose.yml, env.example, scripts/, nginx/, etc.
```

**If project not uploaded, upload it:**

```bash
# From your local machine
scp -r ./qasr-alsultan-dashboard user@your-vps-ip:/home/user/
# or use SFTP/FileZilla
```

### 3. ✅ Environment Configuration

**Create .env file:**

```bash
cd qasr-alsultan-dashboard
cp env.example .env
nano .env
```

**Essential .env settings:**

```env
NODE_ENV=production
DOMAIN_NAME=markupagency.net
EMAIL=hgprand@gmail.com
NEXTAUTH_URL=https://markupagency.net
NEXTAUTH_SECRET=your_secure_secret_here
MONGO_PASSWORD=your_secure_password
DATABASE_URL=mongodb://qasr_admin:your_secure_password@mongo:27017/qasr_alsultan_db
```

### 4. ✅ DNS Configuration

**Check if domain points to your VPS:**

```bash
# Check DNS resolution
nslookup markupagency.net
dig markupagency.net

# Should return your VPS IP address
```

**If DNS not configured:**

- Go to your domain registrar (GoDaddy, Namecheap, etc.)
- Update A record: `markupagency.net` → `your-vps-ip`
- Update CNAME record: `www.markupagency.net` → `markupagency.net`

### 5. ✅ Port and Firewall Check

**Check if ports are open:**

```bash
# Check if ports 80 and 443 are listening
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Check firewall status
sudo ufw status
```

**Configure firewall if needed:**

```bash
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 6. ✅ Service Status Check

**Check if services are running:**

```bash
cd qasr-alsultan-dashboard
docker-compose ps
```

**Expected output:**

```
Name                     Command               State           Ports
qasr-certbot            /bin/sh -c 'trap exi ...   Up
qasr-mongodb            docker-entrypoint.sh mongod   Up      27017/tcp
qasr-nextjs-app         node server.js               Up      3000/tcp
qasr-nginx              /docker-entrypoint.sh ngi ... Up      0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
```

### 7. ✅ Application Health Check

**Test application locally:**

```bash
# Test if app responds
curl http://localhost/api/health
curl http://localhost:3000/api/health
```

**Check logs:**

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f nextjs-app
docker-compose logs -f nginx
docker-compose logs -f mongo
```

## 🔧 Common Issues and Solutions

### Issue 1: "Connection Refused" or "Site Can't Be Reached"

**Possible Causes:**

- Services not running
- Port conflicts
- Firewall blocking

**Solutions:**

```bash
# 1. Start services
docker-compose up -d

# 2. Check if ports are in use
sudo lsof -i :80
sudo lsof -i :443

# 3. Stop conflicting services
sudo systemctl stop apache2  # if Apache is running
sudo systemctl stop nginx    # if system nginx is running

# 4. Restart Docker services
docker-compose restart
```

### Issue 2: "502 Bad Gateway" or "504 Gateway Timeout"

**Possible Causes:**

- Next.js app not responding
- Database connection issues
- Nginx configuration problems

**Solutions:**

```bash
# 1. Check if Next.js app is healthy
docker-compose exec nextjs-app curl http://localhost:3000/api/health

# 2. Check database connection
docker-compose exec mongo mongosh --eval "db.runCommand('ping')"

# 3. Check nginx configuration
docker-compose exec nginx nginx -t

# 4. Restart services in order
docker-compose restart mongo
docker-compose restart nextjs-app
docker-compose restart nginx
```

### Issue 3: SSL Certificate Issues

**Possible Causes:**

- Domain not pointing to server
- Firewall blocking Let's Encrypt
- Certificate renewal failed

**Solutions:**

```bash
# 1. Check certificate status
docker-compose run --rm certbot certificates

# 2. Manually request certificate
docker-compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot --email hgprand@gmail.com --agree-tos --no-eff-email -d markupagency.net -d www.markupagency.net

# 3. Test SSL
curl -I https://markupagency.net
```

### Issue 4: Database Connection Issues

**Possible Causes:**

- MongoDB not running
- Wrong credentials
- Network issues

**Solutions:**

```bash
# 1. Check MongoDB status
docker-compose logs mongo

# 2. Connect to MongoDB
docker-compose exec mongo mongosh

# 3. Check database
use qasr_alsultan_db
show collections

# 4. Restart MongoDB
docker-compose restart mongo
```

## 🚀 Step-by-Step Deployment (Fresh Start)

### Step 1: Connect to VPS

```bash
ssh root@your-vps-ip
```

### Step 2: Install Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Step 3: Upload Project

```bash
# Create directory
mkdir -p /home/user/qasr-alsultan-dashboard
cd /home/user/qasr-alsultan-dashboard

# Upload files (use SCP, SFTP, or git clone)
```

### Step 4: Configure Environment

```bash
cp env.example .env
nano .env
# Configure your domain, passwords, etc.
```

### Step 5: Deploy

```bash
chmod +x scripts/*.sh
./scripts/deploy.sh
```

### Step 6: Verify

```bash
# Check services
docker-compose ps

# Test application
curl http://localhost/api/health

# Test domain (from external)
curl http://markupagency.net
```

## 📞 Quick Commands Reference

```bash
# View service status
docker-compose ps

# View logs
docker-compose logs -f

# Restart all services
docker-compose restart

# Stop all services
docker-compose down

# Start all services
docker-compose up -d

# Update application
./scripts/update.sh

# Check disk space
df -h

# Check memory usage
free -h

# Check running processes
htop
```

## 🆘 Still Not Working?

If your project is still not showing, please provide:

1. **Service status**: `docker-compose ps`
2. **Logs**: `docker-compose logs -f`
3. **Domain DNS**: `nslookup markupagency.net`
4. **Port status**: `sudo netstat -tulpn | grep :80`
5. **Error messages** you're seeing

This will help identify the exact issue!
