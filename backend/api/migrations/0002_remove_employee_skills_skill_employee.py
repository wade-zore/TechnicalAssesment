# Generated by Django 4.2.5 on 2023-10-06 07:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='skills',
        ),
        migrations.AddField(
            model_name='skill',
            name='employee',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='skills', to='api.employee'),
        ),
    ]