
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
        self.other = AnnualEmission.objects.create(
            country="Peru",
            year=2021,
            activity="Transport",
            emission_type="CH4",
            emissions=50.0,
        )
        self.list_url = "/api/emissions/"
        self.detail_url = f"/api/emissions/{self.emission.id}/"

    def test_list_returns_all_items(self):
        res = self.client.get(self.list_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        data = res.json()
        self.assertEqual(len(data), 2)
        countries = {item["country"] for item in data}
        self.assertSetEqual(countries, {"Colombia", "Peru"})

    def test_list_item_fields(self):
        res = self.client.get(self.list_url)
        item = res.json()[0]

        self.assertIn("id", item)
        self.assertIn("country", item)
        self.assertIn("year", item)
        self.assertIn("activity", item)
        self.assertIn("emission_type", item)
        self.assertIn("emissions", item)

    def test_detail_returns_single_item(self):
        res = self.client.get(self.detail_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        data = res.json()
        self.assertEqual(data["id"], self.emission.id)
        self.assertEqual(data["country"], "Colombia")
        self.assertEqual(data["year"], 2020)

    def test_detail_not_found_for_invalid_id(self):
        res = self.client.get("/api/emissions/99999/")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_valid_emission(self):
        payload = {
            "country": "Chile",
            "year": 2022,
            "activity": "Industry",
            "emission_type": "CO2",
            "emissions": "10.5",
        }
        res = self.client.post(self.list_url, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        self.assertTrue(
            AnnualEmission.objects.filter(country="Chile", year=2022).exists()
        )

    def test_create_emission_missing_field(self):
        payload = {
            "year": 2022,
            "activity": "Industry",
            "emission_type": "CO2",
            "emissions": "10.5",
        }
        res = self.client.post(self.list_url, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_delete_not_allowed_if_read_only(self):
        res = self.client.delete(self.detail_url)
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_list_empty_when_no_data(self):
        AnnualEmission.objects.all().delete()
        res = self.client.get(self.list_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.json(), [])
