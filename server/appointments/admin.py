from django.contrib import admin

from .validators import validate_date
from .models import Patient, Appointment
from django import forms
# Register your models here.


class PatientAdmin(admin.ModelAdmin):
    model = Patient
    search_fields = ["id", "name"]


class AppointmentForm(forms.ModelForm):

    
    model = Appointment

    def clean(self):
        try:
            validate_date(self.year, self.month, self.day,
                          self.hour, self.minute)
        except:
            raise forms.ValidationError("Date is not valid!")


class AppointmentAdmin(admin.ModelAdmin):
    model = Appointment
    form = AppointmentForm
    search_fields = ["patient__name", "patient__id"]


admin.site.register(Patient, PatientAdmin)
admin.site.register(Appointment, AppointmentAdmin)
