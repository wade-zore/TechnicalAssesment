from django.urls import include, path
from rest_framework import routers

from .views import Employees

router = routers.DefaultRouter()
router.register("employee", Employees, basename="employee")

urlpatterns = [
    # Existing URL patterns
    path("", include(router.urls)),
]