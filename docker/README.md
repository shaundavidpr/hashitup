# HASH 2K25 Docker Setup

This directory contains Docker configuration files for the HASH 2K25 hackathon platform.

## 🚀 Quick Start

### Prerequisites
- Docker (v20.10+)
- Docker Compose (v2.0+)
- Environment variables configured (see `env.example`)

### Development Setup

1. **Clone and setup environment:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

2. **Start development environment:**
   ```bash
   npm run docker:dev
   ```

3. **Access the application:**
   - Application: http://localhost:3000
   - Database: localhost:5433
   - Redis: localhost:6380

### Production Setup

1. **Build and start production containers:**
   ```bash
   npm run docker:prod
   ```

2. **Access the application:**
   - HTTP: http://localhost:80
   - HTTPS: https://localhost:443
   - Database: localhost:5432
   - Redis: localhost:6379

## 📁 File Structure

```
docker/
├── nginx/
│   ├── nginx.conf          # Nginx reverse proxy configuration
│   └── ssl/               # SSL certificates (create manually)
├── postgres/
│   └── init.sql           # Database initialization script
└── README.md              # This file
```

## 🛠 Available Commands

```bash
# Development
npm run docker:dev         # Start development environment
npm run docker:logs        # View logs from all containers

# Production
npm run docker:prod        # Start production environment
npm run docker:stop        # Stop all containers
npm run docker:reset       # Reset everything (delete volumes)

# Maintenance
npm run docker:clean       # Clean up unused Docker resources
```

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env` and configure:

- **Database:** PostgreSQL connection details
- **Auth:** NextAuth and Google OAuth credentials
- **Email:** SMTP configuration for notifications
- **App:** Application-specific settings

### SSL Certificates (Production)

For HTTPS support, place your SSL certificates in `docker/nginx/ssl/`:
```bash
mkdir -p docker/nginx/ssl
# Copy your certificate files:
# - cert.pem (certificate)
# - key.pem (private key)
```

For development, you can generate self-signed certificates:
```bash
mkdir -p docker/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout docker/nginx/ssl/key.pem \
  -out docker/nginx/ssl/cert.pem \
  -subj "/C=IN/ST=Kerala/L=Kuttikkanam/O=Hash2K25/CN=localhost"
```

## 🏗 Architecture

### Services

1. **hash2k25-app:** Next.js application container
2. **postgres:** PostgreSQL database
3. **redis:** Redis for session storage (optional)
4. **nginx:** Reverse proxy with SSL termination

### Networking

All services communicate through Docker networks:
- `hash2k25-network` (production)
- `hash2k25-dev-network` (development)

### Volumes

Persistent data storage:
- `postgres_data`: Database files
- `redis_data`: Redis persistence

## 🔍 Monitoring & Health Checks

### Health Endpoints

- **Application:** http://localhost:3000/api/health
- **Nginx:** http://localhost/nginx-health

### Container Health Checks

All containers include health checks:
- App: HTTP request to `/api/health`
- Database: PostgreSQL connection test
- Redis: Redis ping command

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f hash2k25-app
docker-compose logs -f postgres
docker-compose logs -f nginx
```

## 🛡 Security Features

### Nginx Security Headers
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Content-Security-Policy
- Strict-Transport-Security

### Rate Limiting
- API endpoints: 10 requests/second
- Auth endpoints: 5 requests/second

### Container Security
- Non-root user execution
- Minimal Alpine Linux base images
- Security-focused Dockerfile practices

## 🚨 Troubleshooting

### Common Issues

1. **Port conflicts:**
   ```bash
   # Check what's using the ports
   lsof -i :3000
   lsof -i :5432
   ```

2. **Permission issues:**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Database connection issues:**
   ```bash
   # Check database logs
   docker-compose logs postgres
   
   # Connect to database manually
   docker-compose exec postgres psql -U hash2k25 -d hash2k25
   ```

4. **Container won't start:**
   ```bash
   # Check container status
   docker-compose ps
   
   # View specific container logs
   docker-compose logs <service-name>
   ```

### Reset Everything

If you need to start fresh:
```bash
# Stop containers and remove volumes
npm run docker:reset

# Remove all images and rebuild
docker-compose down --rmi all
npm run docker:prod
```

## 📊 Performance Optimization

### Production Optimizations

1. **Multi-stage builds** reduce image size
2. **Nginx caching** for static assets
3. **Gzip compression** enabled
4. **Health checks** for reliability
5. **Resource limits** (configure in docker-compose.yml)

### Scaling

To scale the application:
```bash
# Scale app containers
docker-compose up -d --scale hash2k25-app=3

# Use load balancer (configure in nginx.conf)
```

## 📝 Development Notes

### Hot Reloading

Development container supports hot reloading:
- Source code changes trigger automatic rebuilds
- Database changes persist in volumes
- No need to rebuild containers for code changes

### Database Migrations

Run Prisma migrations:
```bash
# From host machine
npx prisma migrate dev

# From container
docker-compose exec hash2k25-app npx prisma migrate dev
```

### Debugging

Debug the application:
```bash
# Access container shell
docker-compose exec hash2k25-app sh

# View application logs
docker-compose logs -f hash2k25-app
```
