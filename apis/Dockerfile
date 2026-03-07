# Build from repo root: docker-compose uses context . and dockerfile apis/Dockerfile
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS builder
COPY . .
RUN pnpm install
RUN pnpm --filter shared build
RUN pnpm --filter apis exec prisma generate
RUN pnpm --filter apis build

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app .
RUN pnpm --filter apis exec prisma generate
EXPOSE 4000
WORKDIR /app/apis
CMD ["node", "dist/index.js"]
