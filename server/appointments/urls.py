from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("get_all/", views.get_all_free),
    path("get_app/", views.get_appointment),
    path("add_date/", views.post_date),
    path("reserve/", views.post_appointment),
    path("approve/", views.admin_approve),
    path("get_reserved/", views.get_reserved)
]