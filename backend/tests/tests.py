import pytest
from rest_framework import status
from rest_framework.test import APIClient
from api.models import Employee, Skill

class TestModels:
    @pytest.mark.django_db
    def test_create_employee(self):
        skill = Skill.objects.create(
            skill_id="c7cf1e23-2c2e-42ec-bdf6-c25aea501fce",
            skill="myskill",
            experience=3,
            seniority_rating="beginner"
        )
        employee = Employee.objects.create(
            id="",
            first_name="you",
            last_name="youself",
            contact_number="0163456789",
            email="test.mail@testmail.com",
            date_of_birth="1988-05-20",
            street_address="1 some Street, someplace",
            city="Some Casdcfity",
            postal_code=13234,
            country="Some Cosdvuntry",
        )
        employee.skills.set([skill])

        assert employee.__str__() == "Employee - you youself"
        assert skill.__str__() == "myskill"

class TestViews:

    @pytest.mark.django_db
    def test_list_view(self):
        client = APIClient()

        response = client.get(
            path="http://localhost:8000/employee/"
        )

        assert response.status_code == status.HTTP_200_OK

    @pytest.mark.django_db
    def test_list_view_search(self):
        client = APIClient()

        response = client.get(
            path="http://localhost:8000/employee/?search=wade"
        )

        assert response.status_code == status.HTTP_200_OK