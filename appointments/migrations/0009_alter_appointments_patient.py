# Generated by Django 4.0.6 on 2022-07-23 17:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0008_remove_patients_date_appointments_patient'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointments',
            name='patient',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='appointments.patients'),
        ),
    ]
