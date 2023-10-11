from django.urls import path
from .views import EmployeeListView, CreateEmployee

urlpatterns = [
    path('', EmployeeListView.as_view(), name='home'),
    path('add_employee/', CreateEmployee.as_view(), name='add_employee')
]
