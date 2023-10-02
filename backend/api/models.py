import datetime
import json
import random
import string
from django.db import models

RATINGS = (
    ("beginner", "Beginner"),
    ("intermediate", "Intermediate"),
    ("expert", "Expert")
)


def generate_custom_id():
    custom_id = ''.join(random.choice(string.ascii_uppercase) for _ in range(2)) + ''.join(
        random.choice(string.digits) for _ in range(4))
    return custom_id


class Skill(models.Model):
    skill_id = models.CharField(max_length=200)
    skill = models.CharField(max_length=200)
    experience = models.IntegerField(default=0)
    seniority_rating = models.CharField(
        max_length=50,
        null=False,
        blank=False,
        choices=RATINGS,
        default="beginner",
    )

    class Meta:
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self):
        return self.skill


class Employee(models.Model):
    id = models.CharField(primary_key=True, max_length=6)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    contact_number = models.CharField(max_length=11)
    email = models.EmailField(max_length=200)
    date_of_birth = models.DateField()
    street_address = models.TextField()
    city = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    skills = models.ManyToManyField(
        Skill, related_name="skills"
    )

    def save(self, *args, **kwargs):
        if not self.id:  # Check if an ID already exists
            self.id = generate_custom_id()
        super(Employee, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "Employee"
        verbose_name_plural = "Employees"

    def __str__(self):
        return f" Employee - {self.first_name} {self.last_name}"
