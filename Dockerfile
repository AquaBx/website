FROM node:25-alpine AS build

WORKDIR /build

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM oven/bun:alpine AS prod

WORKDIR /app

COPY --from=build /build/website/build ./

CMD ["bun","index.js"]