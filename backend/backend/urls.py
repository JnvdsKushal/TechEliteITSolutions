# backend/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('courses.urls')),
    path('', include('academy.urls')),
    path('api/announcements/', include('adminpanel.urls')),  # ← fix this line
]