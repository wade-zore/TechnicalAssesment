# Generated by Django 4.2.5 on 2023-10-06 09:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_employee_date_of_employment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='date_of_employment',
        ),
    ]