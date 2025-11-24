
from rest_framework import mixins, viewsets

from .models import AnnualEmission
from .serializers import AnnualEmissionSerializer


class AnnualEmissionViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = AnnualEmission.objects.all()
    serializer_class = AnnualEmissionSerializer
