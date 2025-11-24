# Ecometrics

Ecometrics is a small platform to explore annual greenhouse gas emissions data, with a Django REST API and an Angular frontend, containerized with Docker.

## Live Project

Deployment: https://ecometrics.hailersh.xyz

## Project URL

GitHub repository: https://github.com/HailerSH/ecometrics

## Project structure

- `backend/` – Django + DRF API and admin
- `frontend/` – Angular application (ecometrics UI)
- `deploy/nginx/` – Nginx config for production
- `docker-compose.dev.yml` – local dev stack (DB + backend)
- `docker-compose.prod.yml` – production stack
- `.env.example` – base environment variables

## Development (local)

1. Clone the repo and copy the env file:

   ```bash
   cp .env.example .env
   # edit DB_*, DJANGO_SECRET_KEY, ALLOWED_HOSTS, etc.
   ```

2. Start database and backend (from `ecometrics/`):

   ```bash
   docker compose -f docker-compose.dev.yml up
   ```

3. Start the Angular app (from `ecometrics/frontend`):

   ```bash
   ng serve
   ```

- Frontend: http://localhost:4200  
- API (default): http://localhost:8000

## Production (very short)

Use `docker-compose.prod.yml` (and `deploy/nginx/`) to run the full stack behind Nginx.  
Adjust env variables and domains before deploying.

## License

Copyright (c) 2025 HailerSH.  
All rights reserved.

Permission is granted to **clone this repository and view, read, and analyze the source code for personal, non-commercial purposes only**.

Any other use — including but not limited to reproduction, modification, redistribution, public hosting, SaaS use, or inclusion in any product or service — is **prohibited** without prior written permission from the copyright holder.
