# ─────────────────────────────────────────────────────────────────────────────
# adminpanel/models.py
# ─────────────────────────────────────────────────────────────────────────────
from django.db import models


class Announcement(models.Model):
    BADGE_COLORS = [
        ('blue',   'Blue'),
        ('green',  'Green'),
        ('orange', 'Orange'),
        ('red',    'Red'),
        ('purple', 'Purple'),
    ]

    text        = models.CharField(max_length=300)
    badge       = models.CharField(max_length=40, blank=True, help_text='Short label e.g. "New Batch", "Offer"')
    badge_color = models.CharField(max_length=10, choices=BADGE_COLORS, default='blue')
    link        = models.URLField(blank=True, help_text='Optional URL the announcement links to')
    link_label  = models.CharField(max_length=40, blank=True, default='Learn more')
    is_active   = models.BooleanField(default=True)
    order       = models.PositiveIntegerField(default=0, help_text='Lower = appears first')
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"[{'✓' if self.is_active else '✗'}] {self.text[:60]}"


