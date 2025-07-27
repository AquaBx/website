FROM oven/bun:alpine AS bun

WORKDIR /app

COPY ./package*.json ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:alpine AS bun

WORKDIR /app

COPY --from=bun /app/build "./public"

CMD ["bun", "./public/index.js"]