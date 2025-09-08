# Stage 1: Build the Next.js application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --no-audit

# Copy the Prisma schema and run `prisma generate`
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the Next.js application for standalone output
RUN npm run build

# Stage 2: Create the production image
FROM node:22-alpine AS runner

WORKDIR /app

# Set the standalone server output
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy the standalone output and necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js server
CMD ["node", "server.js"]