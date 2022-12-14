from datetime import datetime, date
from django.db import models

from .middleware import ErrorHandler
from .validators import validate_age, validate_date, validate_phone
import time

from googletrans import Translator
# Create your models here.


REASONS = ["General", "Respiratory System", "Bones and Joints", "Heart and Blood Vessels", "Female Problems",
           "Urinary System", "Nerves and Muscles", "Immunity and Blood Booster", "Hormones", "Other"]


class Patient(models.Model):  # ONE
    """Model for saving patient infromation

    Args:
        name: Full name of patient
        date_of_birth: Patient's date of birth
        age (NOT NEEDED): Calculated patient's age using date_of_birth attrib
        phone_number:patient's phone number

    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=32)
    date_of_birth = models.DateField()
    age = models.IntegerField(blank=True)
    height = models.IntegerField()
    weight = models.IntegerField()
    bmi = models.FloatField(blank=True)


    phone_number = models.CharField(unique=True, max_length=16)



    anemia = models.BooleanField(default=False)
    blood_sugar = models.BooleanField(default=False)
    kidney_problems = models.BooleanField(default=False)
    liver_problems = models.BooleanField(default=False)
    thyroid_problems = models.BooleanField(default=False)
    heart_problems = models.BooleanField(default=False)
    other_problems = models.TextField(max_length=264, blank=True, null=True)

    
    def clean(self):
        
        if type(self.date_of_birth) is str:
            today = date.today()

            dt = [int(i) for i in self.date_of_birth.split("-")]
            dt = date(*dt)
            self.age = today.year - dt.year - \
                ((today.month, today.day) <
                 (dt.month, dt.day))

        else:
            dt = self.date_of_birth
            today = date.today()

            self.age = today.year - dt.year - \
                ((today.month, today.day) <
                (dt.month, dt.day))


        validate_age(self.age)
        validate_phone(self.phone_number)


    @ErrorHandler
    def save(self, *args, **kwargs):
        """Overrides the save method of the model
        """
        if len(self.other_problems) != 0:

            translator = Translator()
            translation = translator.translate(self.other_problems, dest="ar")
            time.sleep(2)
            self.other_problems = translation.text
        self.bmi = round(self.weight / (self.height / 100)**2,2)
        today = date.today()
        if type(self.date_of_birth) is str:
            dt = [int(i) for i in self.date_of_birth.split("-")]
            dt = date(*dt)
            self.age = today.year - dt.year - \
                ((today.month, today.day) <
                 (dt.month, dt.day))
            self.clean()
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
    """Model for appointments and important info about every appointment

    Attributes:
        models (Patient): Every appointment is has patient id
        date: year, month, day, hour and minute
        reason: reason for appointment which is specified in a range of general reasond
        is_free: True of False depending on if appointment is taken or not

    """
    id = models.AutoField(primary_key=True)
    year = models.IntegerField(default=date.today().year)
    month = models.IntegerField(choices=((i + 1, str(i + 1))
                                for i in range(12)), default=date.today().month)
    day = models.IntegerField(choices=((i + 1, str(i + 1))
                              for i in range(31)), default=date.today().day)
    hour = models.IntegerField(choices=((i, str(i))
                               for i in range(24)), default=0)
    minute = models.IntegerField(choices=((i, str(i))
                                 for i in range(60)), default=0)
    name = models.CharField(max_length=10, blank=True)
    reason = models.CharField(
        choices=((i, i) for i in REASONS), max_length=64, blank=True, null=True)
    is_free = models.BooleanField(default=True)

    payment = models.IntegerField(blank=True, null=True)

    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, null=True, blank=True)
    
    
    def clean(self):
        validate_date(self.year, self.month, self.day,
                          self.hour, self.minute)

    @ErrorHandler
    def save(self, *args, **kwargs):
        """Overrides the save method of the model mainly for validation

        Raises:
            Exception: 
                ValueError: Exception is raised if date is not valid

        """
        

        self.clean()

        self.name = datetime(self.year, self.month, self.day,
                                 self.hour, self.minute).strftime("%A")

        super(Appointment, self).save(*args, **kwargs)



    def __setitem__(self, key, value):
        return setattr(self, key, value)

    def __getitem__(self, key):
        return getattr(self, key)

    def __str__(self):
        def zero(x): return "0" + str(x) if x < 10 else x

        if self.is_free:
            return f"{self.name} [{zero(self.day)} / {zero(self.month)} / {self.year}] ->  {zero(self.hour)}:{zero(self.minute)}"

        return f"{self.name}, [{zero(self.day)} / {zero(self.month)} / {self.year}] -> {zero(self.hour)}:{zero(self.minute)} -> {self.patient.name}"
