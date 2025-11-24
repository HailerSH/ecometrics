
from django.db import models


class AnnualEmission(models.Model):

    year = models.IntegerField()

    emissions = models.FloatField()

    emission_type = models.CharField(
        default="",
        max_length=255
    )

    country = models.CharField(
        default="",
        max_length=255
    )

    activity = models.CharField(
        default="",
        max_length=255
    )

    def __str__(self):
        return f"{self.year} | {self.country} | {self.emission_type}"
