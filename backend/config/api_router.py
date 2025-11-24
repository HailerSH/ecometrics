
from rest_framework.routers import DefaultRouter

from emissions.urls import api_urls as emissions_api_urls

router = DefaultRouter()


for api_url in emissions_api_urls:
    router.register(**api_url)
