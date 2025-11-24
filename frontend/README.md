# Frontend

Angular frontend for Ecometrics, consuming the Django REST API.

## Development

In the typical workflow the backend runs via Docker:

```bash
# from ecometrics/
docker compose -f docker-compose.dev.yml up
```

Then start the Angular dev server:

```bash
cd frontend
npm install
ng serve
```

App URL: http://localhost:4200

API base URL is configured in `src/environments/environment.ts` (and `environment.prod.ts` for builds).

## Useful scripts

```bash
ng test        # unit tests
ng build       # production build
```

See the root README for project overview and license.
