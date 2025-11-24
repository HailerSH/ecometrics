# Build
FROM node:20 AS build
WORKDIR /app

# This will be filled from .env via docker-compose
ARG APP_ENV=production
ENV APP_ENV=${APP_ENV}

COPY package*.json ./
RUN npm install
COPY . .

# Use APP_ENV to decide which Angular build to run
RUN if [ "$APP_ENV" = "production" ]; then \
      npm run build:prod; \
    else \
      npm run build; \
    fi

# Serve
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
