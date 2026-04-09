"""
SAVE AS: courses/models.py
(your existing models unchanged — AuthToken added at the bottom)
"""

from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User


class Course(models.Model):
    COURSE_TYPE_CHOICES = [
        ('online', 'Online'),
        ('offline', 'Offline'),
    ]
    LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]

    title       = models.CharField(max_length=255)
    slug        = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    course_type = models.CharField(max_length=10, choices=COURSE_TYPE_CHOICES)
    level       = models.CharField(max_length=20, choices=LEVEL_CHOICES, blank=True)
    duration    = models.CharField(max_length=50)
    price       = models.CharField(max_length=20)
    rating      = models.DecimalField(max_digits=3, decimal_places=1, default=4.5)
    students    = models.CharField(max_length=50)
    topics      = models.JSONField(default=list)
    location    = models.CharField(max_length=100, blank=True)
    schedule    = models.CharField(max_length=100, blank=True)
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return f"{self.title} ({self.course_type})"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Booking(models.Model):
    BOOKING_TYPE_CHOICES = [
        ('demo', 'Free Demo Class'),
        ('consultation', 'Free Consultation'),
        ('enrollment', 'Course Enrollment'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    course       = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    name         = models.CharField(max_length=100)
    email        = models.EmailField()
    phone        = models.CharField(max_length=15)
    booking_type = models.CharField(max_length=20, choices=BOOKING_TYPE_CHOICES, default='demo')
    preferred_date = models.DateField(null=True, blank=True)
    message      = models.TextField(blank=True)
    status       = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.booking_type} ({self.status})"


class ContactMessage(models.Model):
    name       = models.CharField(max_length=100)
    email      = models.EmailField()
    phone      = models.CharField(max_length=15, blank=True)
    subject    = models.CharField(max_length=200)
    message    = models.TextField()
    is_read    = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"


# ── NEW: persists tokens across server restarts ───────────────────────────────
class AuthToken(models.Model):
    user       = models.OneToOneField(User, on_delete=models.CASCADE, related_name='auth_token')
    token      = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Token for {self.user.email}"