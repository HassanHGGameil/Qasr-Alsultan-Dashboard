# Use Node.js 20 LTS as base
FROM node:20-alpine AS base

# ------------------------------
# 1. Dependencies stage
# ------------------------------
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Copy only package files and Prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install ALL deps (prod + dev)
RUN npm ci

# ------------------------------
# 2. Builder stage
# ------------------------------
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy rest of project
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app in standalone mode
RUN npm run build

# ------------------------------
# 3. Production runner stage
# ------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy build artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Ensure Prisma runtime is present
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000

# ✅ Entry point for Next.js standalone
CMD ["node", "server.js"]
