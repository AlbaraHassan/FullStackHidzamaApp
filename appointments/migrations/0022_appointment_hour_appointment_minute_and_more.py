# Generated by Django 4.0.6 on 2022-07-26 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0021_alter_patient_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='hour',
            field=models.IntegerField(default=23),
        ),
        migrations.AddField(
            model_name='appointment',
            name='minute',
            field=models.IntegerField(default=8),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='day',
            field=models.IntegerField(default=26),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='month',
            field=models.IntegerField(default=2022),
        ),
    ]