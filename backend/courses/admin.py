from django.contrib import admin
from .models import Course, Booking, ContactMessage


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'course_type', 'level', 'price', 'rating', 'is_active')
    list_filter = ('course_type', 'level', 'is_active')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'course', 'booking_type', 'status', 'created_at')
    list_filter = ('status', 'booking_type')
    search_fields = ('name', 'email')
    list_editable = ('status',)


@admin.register(ContactMessage)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'is_read', 'created_at')
    list_filter = ('is_read',)
    search_fields = ('name', 'email', 'subject')
    list_editable = ('is_read',)