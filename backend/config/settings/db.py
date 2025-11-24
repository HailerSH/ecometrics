
import os

# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("DB_NAME", "ecometrics"),
        "USER": os.environ.get("DB_USER", "ecometrics"),
        "PASSWORD": os.environ.get("DB_PASSWORD", "ecometrics"),
        "HOST": os.environ.get("DB_HOST", "localhost"),
        "PORT": os.environ.get("DB_PORT", "5432"),
    }
}
