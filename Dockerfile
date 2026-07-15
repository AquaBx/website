FROM node:22-slim AS build

WORKDIR /build

COPY . .

RUN yarn install --frozen-lockfile
RUN VIPS_CONCURRENCY=1 UV_THREADPOOL_SIZE=1 NODE_OPTIONS="--max-old-space-size=1536" yarn build

FROM oven/bun:alpine AS prod

WORKDIR /app

COPY --from=build /build/website/build ./

CMD ["bun","index.js"]