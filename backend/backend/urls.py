from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Backend is running 🚀")

urlpatterns = [
    path('', home),  # root route
    path('admin/', admin.site.urls),

    path('', include('courses.urls')),
    path('academy/', include('academy.urls')),
    path('api/announcements/', include('adminpanel.urls')),
]