# ─────────────────────────────────────────────────────────────────────────────
# adminpanel/urls.py  ← THIS FIXES YOUR MIGRATION ERROR TOO
# ─────────────────────────────────────────────────────────────────────────────
from django.urls import path
from .views import (
     announcement_list,
     admin_announcement_list,
     admin_announcement_detail,
     admin_announcement_toggle,
)

urlpatterns = [
    
    path('',                    announcement_list,           name='announcement-list'),
    path('admin/',              admin_announcement_list,     name='admin-announcement-list'),
    path('admin/<int:pk>/',     admin_announcement_detail,   name='admin-announcement-detail'),
    path('admin/<int:pk>/toggle/', admin_announcement_toggle, name='admin-announcement-toggle'),
]