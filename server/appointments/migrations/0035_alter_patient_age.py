# Generated by Django 4.0.6 on 2022-08-04 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0034_alter_patient_age_alter_patient_date_of_birth'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='age',
            field=models.IntegerField(blank=True),
        ),
    ]
