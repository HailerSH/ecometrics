
from .views import AnnualEmissionViewSet


api_urls = [
    {
        "prefix": "emissions",
        "viewset": AnnualEmissionViewSet,
        "basename": "emissions",
    }
]
