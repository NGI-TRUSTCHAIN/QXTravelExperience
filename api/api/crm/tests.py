from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from typing import Dict, Any


class CrmViewSetTest(APITestCase):
    base_edit_url: str = reverse("api:crm-list")
    base_url_login: str = reverse("api:login-list")

    data_login: Dict[str, str] = {"password": "12345678", "email": "teast@admin.com"}

    def test_edit(self) -> None:

        # Login to retrieve token

        response = self.client.post(f"{self.base_url_login}", data=self.data_login)
        response_data: Dict[str, Any] = response.json()

        token: str = response_data["token"]
        user_id: str = response_data["user"]["_id"]

        self.client.credentials(HTTP_AUTHORIZATION=token)

        # Edit user

        data: Dict[str, str] = {
            "email": "new@admin.com",
            "userID": user_id,
        }

        response = self.client.post(f"{self.base_edit_url}", data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = response.json()

        self.assertEqual(response_data["success"], True)
