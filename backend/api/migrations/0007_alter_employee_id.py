# Generated by Django 4.2.5 on 2023-10-01 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_employee_employee_id_alter_employee_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='id',
            field=models.CharField(default='WJ8172', primary_key=True, serialize=False),
        ),
    ]