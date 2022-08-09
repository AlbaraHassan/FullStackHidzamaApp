from django.urls import path
from . import views

urlpatterns = [
    path("get_all/", views.get_all_free),
    path("get_app/<str:pk>/", views.get_appointment),
    path("add_date/", views.post_date),
    path("reserve/<str:pk>/", views.post_appointment),
    path("approve/<str:pk>/", views.admin_approve),
    path("get_reserved/", views.get_reserved)
]