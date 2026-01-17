# 1. Base Image
FROM node:20-alpine AS base

# 2. Dependencies Stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package manager files
COPY package.json package-lock.json* ./

# Copy folder prisma SEBELUM npm ci (PENTING)
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# 3. Builder Stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# 4. Runner Stage (Production)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# --- FIX 1: Install OpenSSL (Agar Prisma Engine jalan di Alpine) ---
RUN apk add --no-cache openssl
# -------------------------------------------------------------------

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# --- FIX 2: Copy folder Prisma (Agar 'db push' nemu schema.prisma) ---
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
# ---------------------------------------------------------------------

# Set permission cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]