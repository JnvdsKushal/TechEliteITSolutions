"""
SAVE AS: courses/urls.py
(fully replaces your existing courses/urls.py)

Changes from previous version:
  - Removed 'from users import views as auth_views' (no users app exists)
  - All views now imported from local . (courses/views.py)
  - Added 3 new auth routes: logout, profile, enrollments
"""

from django.urls import path
from . import views

urlpatterns = [
    # ── Public: Courses ───────────────────────────────────────────────────────
    path('api/courses/',             views.CourseListView.as_view()),
    path('api/courses/online/',      views.online_courses),
    path('api/courses/offline/',     views.offline_courses),
    path('api/courses/<slug:slug>/', views.CourseDetailView.as_view()),

    # ── Public: Bookings & Stats ──────────────────────────────────────────────
    path('api/bookings/',            views.BookingCreateView.as_view()),
    path('api/stats/',               views.site_stats),

    # ── Auth ──────────────────────────────────────────────────────────────────
    path('api/auth/register/',       views.register),
    path('api/auth/login/',          views.login),
    path('api/auth/logout/',         views.logout),
    path('api/auth/contact/',        views.contact),
    path('api/auth/profile/',        views.profile),        # GET + PATCH
    path('api/auth/enrollments/',    views.my_enrollments), # GET

    # ── Admin: Stats ──────────────────────────────────────────────────────────
    path('api/admin/stats/',                       views.admin_stats),

    # ── Admin: Courses ────────────────────────────────────────────────────────
    path('api/admin/courses/',                     views.AdminCourseListCreateView.as_view()),
    path('api/admin/courses/<slug:slug>/',         views.AdminCourseDetailView.as_view()),

    # ── Admin: Bookings ───────────────────────────────────────────────────────
    path('api/admin/bookings/',                    views.AdminBookingListView.as_view()),
    path('api/admin/bookings/<int:pk>/',           views.AdminBookingDetailView.as_view()),

    # ── Admin: Enrollments ────────────────────────────────────────────────────
    path('api/admin/enrollments/',                 views.admin_enrollment_list),
    path('api/admin/enrollments/<int:pk>/',        views.admin_enrollment_detail),
]