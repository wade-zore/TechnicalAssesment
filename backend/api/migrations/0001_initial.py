# Generated by Django 4.2.5 on 2023-10-01 10:54

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Skill",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("skill_id", models.CharField(max_length=200)),
                ("skill", models.CharField(max_length=200)),
                ("experience", models.IntegerField(default=0)),
                (
                    "seniority_rating",
                    models.CharField(
                        choices=[
                            ("beginner", "Beginner"),
                            ("intermediate", "Intermediate"),
                            ("expert", "Expert"),
                        ],
                        default="Beginner",
                        max_length=50,
                    ),
                ),
            ],
            options={
                "verbose_name": "Skill",
                "verbose_name_plural": "Skills",
            },
        ),
        migrations.CreateModel(
            name="Employee",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "employee_id",
                    models.CharField(max_length=200, null=True, unique=True),
                ),
                ("first_name", models.CharField(max_length=200)),
                ("last_name", models.CharField(max_length=200)),
                ("contact_number", models.CharField(max_length=11)),
                ("email", models.EmailField(max_length=200)),
                ("date_of_birth", models.DateField()),
                ("street_address", models.TextField()),
                ("city", models.CharField(max_length=200)),
                ("postal_code", models.CharField(max_length=200)),
                ("country", models.CharField(max_length=200)),
                (
                    "skills",
                    models.ManyToManyField(related_name="skills", to="api.skill"),
                ),
            ],
            options={
                "verbose_name": "Employee",
                "verbose_name_plural": "Employees",
            },
        ),
    ]