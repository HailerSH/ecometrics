# Backend

Django + Django REST Framework backend for Ecometrics.

## Main features

- PostgreSQL-backed data model for annual emissions
- REST API consumed by the Angular frontend
- Django admin for managing emissions data

## Local development

The usual way to run this in dev is via Docker from the repo root:

```bash
cd ..
docker compose -f docker-compose.dev.yml up
```

## Load initial data
```bash
cd ..
docker compose -f docker-compose.prod.yml exec backend python manage.py loaddata annualemission.json
```

The browsable API and admin will then be available on the configured host/port.
