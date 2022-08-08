from django.contrib import admin

from .validators import validate_date
from .models import Patient, Appointment
from django import forms
# Register your models here.


class PatientAdmin(admin.ModelAdmin):
    model = Patient
    search_fields = ["id", "name"]


class AppointmentForm(forms.ModelForm):

    class Meta:
        model = Appointment
        fields = "__all__"

    def clean(self):
        try:
            validate_date(self.year, self.month, self.day,
                          self.hour, self.minute)
        except Exception as e:
            raise forms.ValidationError(e.args[0])


class AppointmentAdmin(admin.ModelAdmin):
    model = Appointment
    form = AppointmentForm
    search_fields = ["patient__name", "patient__id"]


admin.site.register(Patient, PatientAdmin)
admin.site.register(Appointment, AppointmentAdmin)
