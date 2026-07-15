FROM node:22-slim AS build

WORKDIR /build

COPY . .

RUN yarn install --frozen-lockfile
RUN DEBUG=vite:* yarn build

FROM oven/bun:alpine AS prod

WORKDIR /app

COPY --from=build /build/website/build ./

CMD ["bun","index.js"]