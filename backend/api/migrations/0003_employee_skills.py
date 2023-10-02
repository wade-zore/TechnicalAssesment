# Generated by Django 4.2.5 on 2023-10-01 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_employee_skills'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='skills',
            field=models.ManyToManyField(null=True, related_name='skills', to='api.skill'),
        ),
    ]