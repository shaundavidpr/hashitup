# HASH 2K25 - Next.js Application Dockerfile
# Multi-stage build for production optimization

# Stage 1: Base with dependencies
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Stage 2: Production dependencies
FROM base AS deps
# Install production dependencies (skip postinstall to avoid Prisma errors)
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

# Stage 3: Builder with all dependencies
FROM base AS builder
# Install all dependencies (including dev dependencies for build, skip postinstall initially)
RUN npm ci --ignore-scripts

# Copy source code (including Prisma schema)
COPY . .

# Set build environment
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 4: Runner (Production)
FROM node:18-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy Prisma files
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./src/generated

# Set correct permissions
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variable for hostname
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["node", "server.js"]
