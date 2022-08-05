from django.contrib import admin
from .models import Patient, Appointment
# Register your models here.

class PatientAdmin(admin.ModelAdmin):
    model = Patient
    search_fields = ["id", "name"]

class AppointmentAdmin(admin.ModelAdmin):
    model = Appointment
    search_fields = ["patient__name", "patient__id"]

admin.site.register(Patient, PatientAdmin)
admin.site.register(Appointment, AppointmentAdmin)

