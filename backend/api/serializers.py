import random
import string

from rest_framework.serializers import ModelSerializer
from .models import Employee, Skill


class SkillSerializer(ModelSerializer):
    class Meta:
        model = Skill
        exclude = ["id"]


class EmployeeSerializer(ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = Employee
        fields = "__all__"

    def create(self, validated_data):
        # Generate a custom ID for the employee
        custom_id = ''.join(random.choice(string.ascii_uppercase) for _ in range(2)) + ''.join(random.choice(string.digits) for _ in range(4))

        # Extract the skills data from validated_data
        skills_data = validated_data.pop('skills', [])

        print(validated_data)
        # Create the employee instance without skills
        employee = Employee.objects.create(employee_id=custom_id, **validated_data)

        # Create or associate skills with the employee
        for skill_data in skills_data:
            skill, created = Skill.objects.get_or_create(**skill_data)
            employee.skills.add(skill)

        return employee

    def update(self, instance, validated_data):
        # Update all fields using validated_data
        instance.__dict__.update(**validated_data)

        # Extract and update skills if present in validated_data
        skills_data = validated_data.pop('skills', [])

        # Clear existing skills
        instance.skills.clear()

        # Update or associate skills with the employee
        for skill_data in skills_data:
            skill_id = skill_data.get('skill_id')
            if skill_id:
                skill = Skill.objects.get(skill_id=skill_id)
                skill.skill = skill_data.get('skill')
                skill.experience = skill_data.get('experience')
                skill.seniority_rating = skill_data.get('seniority_rating')
                skill.save()
                instance.skills.add(skill)
            else:
                # If there's no skill_id, create a new skill
                skill, created = Skill.objects.get_or_create(**skill_data)
                instance.skills.add(skill)

        instance.save()
        return instance

