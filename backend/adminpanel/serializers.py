# ─────────────────────────────────────────────────────────────────────────────
# adminpanel/serializers.py
# ─────────────────────────────────────────────────────────────────────────────
from rest_framework import serializers
from .models import Announcement 


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Announcement
        fields = [
            'id', 'text', 'badge', 'badge_color',
            'link', 'link_label', 'is_active', 'order',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

