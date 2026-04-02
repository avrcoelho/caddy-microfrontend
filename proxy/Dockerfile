FROM node:20-alpine AS layout-builder
WORKDIR /build
COPY layout/package.json ./
RUN npm install
COPY layout/ ./
RUN npm run build

FROM caddy:2-alpine
COPY --from=layout-builder /build/dist/ /srv/layout/
COPY proxy/Caddyfile /etc/caddy/Caddyfile
