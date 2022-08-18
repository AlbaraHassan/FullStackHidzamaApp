from django.urls import path
from . import views


urlpatterns = [
    path("", views.ListFreeView.as_view()),
    path("add/", views.AppointmentView.as_view()),
    path("reserved/", views.ListReservedView.as_view()),
    path("<str:pk>/", views.AppointmentView.as_view()),
    path("<str:pk>/reserve/", views.ReserveView.as_view())
]
