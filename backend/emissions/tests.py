
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from emissions.models import AnnualEmission


class AnnualEmissionAPITests(APITestCase):
    def setUp(self):
        self.emission = AnnualEmission.objects.create(
            country="Colombia",
            year=2020,
            activity="Energy",
            emission_type="CO2",
            emissions=123.45,
        )
        self.url = "/api/emissions/"

    def test_emissions_list_returns_correct_data(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()

        # If you return a list
        self.assertEqual(len(data), 1)
        item = data[0]

        self.assertEqual(item["country"], "Colombia")
        self.assertEqual(item["year"], 2020)
        self.assertEqual(item["activity"], "Energy")
        self.assertEqual(item["emission_type"], "CO2")
        self.assertAlmostEqual(float(item["emissions"]), 123.45, places=2)
