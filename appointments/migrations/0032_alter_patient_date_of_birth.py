# Generated by Django 4.0.6 on 2022-08-04 17:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0031_alter_patient_age'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='date_of_birth',
            field=models.DateField(default=datetime.datetime(2022, 8, 4, 19, 46, 44, 223389)),
        ),
    ]
