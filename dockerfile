# Use Node.js 20 LTS (Debian-based, more stable than Alpine)
FROM node:20-bullseye AS base

# ------------------------------
# 1. Dependencies stage
# ------------------------------
FROM base AS deps

# Install required system packages
RUN apt-get update && apt-get install -y openssl python3 build-essential && rm -rf /var/lib/apt/lists/*


WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies (dev + prod)
RUN npm ci

# Copy Prisma schema
COPY prisma ./prisma/

# ------------------------------
# 2. Builder stage
# ------------------------------
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the project
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# ------------------------------
# 3. Production runner stage
# ------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy necessary build output and assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Copy Prisma runtime (ensures binaries exist)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"

# Optional healthcheck (you can comment out if not needed)
# HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# ✅ Entry point for Next.js standalone
CMD ["node", "server.js"]
