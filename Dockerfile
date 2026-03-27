# Stage 1: Build
FROM node:20-alpine AS build

# Устанавливаем pnpm
RUN npm install -g pnpm

WORKDIR /app

# Копируем только файлы зависимостей для кеширования слоев
COPY pnpm-lock.yaml package.json ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем остальные файлы и собираем проект
COPY . .
RUN pnpm run build

# Stage 2: Serve (Nginx)
FROM nginx:stable-alpine

# Копируем билд из первой стадии
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфиг Nginx (обязательно создай этот файл рядом с Dockerfile)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Команда для подмены URL бэкенда в рантайме и запуск Nginx
# Мы ищем заглушку __BACKEND_URL_PLACEHOLDER__ в index.html и меняем её на переменную $BACKEND_URL
CMD ["/bin/sh", "-c", "sed -i 's|__BACKEND_URL_PLACEHOLDER__|'\"${BACKEND_URL:-http://localhost:8000}\"'|g' /usr/share/nginx/html/index.html && nginx -g 'daemon off;'"]

EXPOSE 80