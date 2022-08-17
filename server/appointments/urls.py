from django.urls import path
from .views import ListFreeView, AppointmentView, AddAppointmentView, ReserveView, ListReservedView


urlpatterns = [
    path("<str:pk>/reserve/", ReserveView.as_view()),
    path("add/", AddAppointmentView.as_view()),
    path("reserved/", ListReservedView.as_view()),
    path("<str:pk>/", AppointmentView.as_view()),
    path("", ListFreeView.as_view()),
]
