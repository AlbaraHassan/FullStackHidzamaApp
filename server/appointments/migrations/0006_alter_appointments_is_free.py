# Generated by Django 4.0.6 on 2022-07-23 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0005_alter_appointments_is_free'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointments',
            name='is_free',
            field=models.BooleanField(),
        ),
    ]
