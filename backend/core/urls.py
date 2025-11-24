
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.templatetags.static import static

from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

from .api_router import router


urlpatterns = [
    path('admin/', admin.site.urls),
    path("favicon.ico", RedirectView.as_view(url=static("favicon.ico"))),

    path('api/', include(router.urls)),
    # Schema
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Swagger UI
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    # ReDoc
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
