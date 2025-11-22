
from rest_framework.viewsets import ModelViewSet

from .models import AnnualEmission
from .serializers import AnnualEmissionSerializer


class AnnualEmissionViewSet(ModelViewSet):
    queryset = AnnualEmission.objects.all().order_by("year")
    serializer_class = AnnualEmissionSerializer
