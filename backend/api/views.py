from django.db.models import Q
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Employee
from .serializers import EmployeeSerializer

FIELDS_TO_SEARCH = ['first_name', 'last_name', 'email']


class Employees(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def list(self, request, *args, **kwargs):

        if request.query_params.get("search"):
            search_field = request.query_params.get("search")

            # Create an empty Q object to build the OR clauses
            q_objects = Q()

            # Loop through the fields and add OR clauses to the Q object
            for field in FIELDS_TO_SEARCH:
                q_objects |= Q(**{f"{field}__icontains": search_field})
            # Apply the OR clauses to the queryset
            queryset = Employee.objects.filter(q_objects)
        else:
            queryset = Employee.objects.all()

        data = EmployeeSerializer(queryset, many=True).data

        return Response(data)
