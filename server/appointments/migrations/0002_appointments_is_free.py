# Generated by Django 4.0.6 on 2022-07-23 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointments',
            name='is_free',
            field=models.BooleanField(default=True),
        ),
    ]