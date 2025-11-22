
from rest_framework import serializers

from .models import AnnualEmission


class AnnualEmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnualEmission
        fields = "__all__"
