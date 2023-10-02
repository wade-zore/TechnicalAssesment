import json
import random
import string
from drf_writable_nested import WritableNestedModelSerializer
from rest_framework.serializers import ModelSerializer, CharField
from .models import Employee, Skill


class SkillSerializer(ModelSerializer):
    class Meta:
        model = Skill
        exclude = ["id"]


class EmployeeSerializer(WritableNestedModelSerializer):
    skills = SkillSerializer(many=True)
    id = CharField(read_only=True)

    class Meta:
        model = Employee
        fields = "__all__"
        read_only_fields = ["id"]


