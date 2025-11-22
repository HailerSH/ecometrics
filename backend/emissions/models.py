
from django.db import models


class AnnualEmission(models.Model):
    year = models.IntegerField()
    emissions = models.FloatField()
