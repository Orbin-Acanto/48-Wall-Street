FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat wget
WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --only=production && \
    cp -R node_modules /tmp/node_modules && \
    npm ci

FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN wget -O ./public/floor-plans/e.glb https://github.com/Orbin-Acanto/48-Wall-Street/releases/download/v1/e.glb && \
    wget -O ./public/floor-plans/f.glb https://github.com/Orbin-Acanto/48-Wall-Street/releases/download/v1/f.glb

RUN ls -lh ./public/floor-plans/e.glb ./public/floor-plans/f.glb

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

COPY --from=deps /tmp/node_modules ./node_modules

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]