# AI Chat Interface (Test Task)

Интерфейс чата с поддержкой потоковой передачи ответов (SSE), авторизацией и адаптивной версткой.

## 🐋 Как запустить

### Docker

```shell
docker build -t chat-app .
```

Запуск со стандартным BACKEND_URL

```shell
sudo docker run -d -p 3000:80 --name frontend-chat chat-app
```

Запуск со кастомным BACKEND_URL

```shell
sudo docker run -d -p 3000:80 -e BACKEND_URL="http://localhost:1234" --name frontend-chat chat-app
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000)

## 🛠 Технологический стек

- **Core**: React 18, TypeScript (Strict Mode).

- **State** Management: Redux Toolkit (обработка асинхронных событий, хранение истории чата).

- **Architecture**: Feature-Sliced Design (FSD) — модульная и масштабируемая структура.

- **Styles**: SCSS, использование Mixins для адаптивности, переменные для темизации.

- **Package Manager**: pnpm.

- **Infrastructure**: Nginx (раздача статики), Docker (Runtime конфигурация через переменные окружения).

## 📂 Структура проекта (FSD)

- **src/app** — инициализация (store, providers, styles).

- **src/pages** — основные страницы (ChatPage, LoginPage, PersonalPage).

- **src/entities** — бизнес-сущности (Chat - парсер и модель).

- **src/shared** — UI-kit, API-клиент, универсальные утилиты (throttle, hooks).
