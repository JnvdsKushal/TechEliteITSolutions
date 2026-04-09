from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register),
    path('api/login/',    views.login),
    path('api/contact/',  views.contact),
]