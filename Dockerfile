# 1. Base Image
FROM node:20-alpine AS base

# 2. Dependencies Stage
FROM base AS deps
# Gunakan openssl saja, hapus openssl1.1-compat
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

RUN npm ci

# 3. Builder Stage
FROM base AS builder
# Tambahkan openssl di sini juga
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Tambahkan variable ini agar Prisma tahu lingkungan musl (Alpine)
ENV PRISMA_CLI_BINARY_TARGETS=linux-musl-openssl-3.0.x
ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npm run build

# 4. Runner Stage (Production)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
RUN apk add --no-cache openssl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]