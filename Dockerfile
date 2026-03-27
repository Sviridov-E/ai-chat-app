# Stage 1: Build
FROM node:20-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Stage 2: Serve (Nginx)
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Команда для подмены URL бэкенда в рантайме и запуск Nginx
# Ищем заглушку __BACKEND_URL_PLACEHOLDER__ в index.html и меняем её на переменную $BACKEND_URL
CMD ["/bin/sh", "-c", "sed -i 's|__BACKEND_URL_PLACEHOLDER__|'\"${BACKEND_URL:-http://localhost:8000}\"'|g' /usr/share/nginx/html/index.html && nginx -g 'daemon off;'"]

EXPOSE 80
