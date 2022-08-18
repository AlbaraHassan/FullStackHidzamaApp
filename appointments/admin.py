from django.contrib import admin
from .models import Patient, Appointment
# Register your models here.

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    model = Patient
    search_fields = ["id", "name"]

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    model = Appointment
    search_fields = ["patient__name", "patient__id"]


