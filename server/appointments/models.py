from datetime import datetime, date
from pyexpat import model
from django.db import models
from django.core.validators import RegexValidator
from .validators import validate_age, validate_date, validate_phone

# Create your models here.


REASONS = ["General", "Respiratory System", "Bones and Joints", "Heart and Blood Vessels","Female Problems", "Urinary System","Nerves and Muscles", "Immunity and Blood Booster", "Hormones", "Other"]

class Patient(models.Model):  # ONE

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=32)
    date_of_birth = models.DateField()
    age = models.IntegerField(blank=True)
    phone_number = models.CharField(unique=True, max_length=16, validators=[
                                    validate_phone])

    def save(self, *args, **kwargs):
        today = date.today()
        if type(self.date_of_birth) is str:
            dt = [int(i) for i in self.date_of_birth.split("-")]
            dt = date(*dt)
            self.age = today.year - dt.year - \
            ((today.month, today.day) <
             (dt.month, dt.day))
            validate_age(self.age)
        else:
            dt = self.date_of_birth
        self.age = today.year - dt.year - \
            ((today.month, today.day) <
             (dt.month, dt.day))
        super(Patient, self).save(*args, **kwargs)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def __getitem__(self, key):
        return getattr(self, key)

    def __str__(self):
        return f"{self.id}: {self.name}"


class Appointment(models.Model):  # MANY
    id = models.AutoField(primary_key=True)
    year = models.IntegerField(default=date.today().year)
    month = models.IntegerField(choices=((i+1,str(i+1)) for i in range(12)), default=date.today().month)
    day = models.IntegerField(choices=((i+1,str(i+1)) for i in range(31)), default=date.today().day)
    hour = models.IntegerField(choices=((i,str(i)) for i in range(24)), default=0)
    minute = models.IntegerField(choices=((i,str(i)) for i in range(60)),default=0)
    name = models.CharField(max_length=10, blank=True)
    reason = models.CharField(choices=((i,i) for i in REASONS), max_length=64, blank=True, null=True, default=REASONS[0])
    is_free = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=False)
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, null=True, blank=True)

    def save(self, *args, **kwargs):
        try:

            validate_date(self.year, self.month, self.day,
                          self.hour, self.minute)


            self.name = datetime(self.year, self.month, self.day,
                                 self.hour, self.minute).strftime("%A")
                                 
            super(Appointment, self).save(*args, **kwargs)

        except ValueError:
            raise Exception("Not a valid date!")

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def __getitem__(self, key):
        return getattr(self, key)

    def __str__(self):
        if self.is_free:
            return f"{self.name}, {self.day} / {self.month} / {self.year}, {self.hour}:{self.minute}"

        return f"{self.name}, {self.day} / {self.month} / {self.year}, {self.hour}:{self.minute} -> {self.patient.name}"
