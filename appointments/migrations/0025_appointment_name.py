# Generated by Django 4.0.6 on 2022-08-02 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0024_appointment_is_approved_alter_appointment_is_free'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='name',
            field=models.CharField(default='nigga', max_length=10),
        ),
    ]
