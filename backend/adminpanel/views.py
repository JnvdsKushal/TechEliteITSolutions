# ─────────────────────────────────────────────────────────────────────────────
# adminpanel/views.py
# ─────────────────────────────────────────────────────────────────────────────
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from .models import Announcement
from .serializers import AnnouncementSerializer


# ── Public — used by the frontend AnnouncementBar ─────────────────────────────
@api_view(['GET'])
@permission_classes([AllowAny])
def announcement_list(request):
    """
    GET /api/announcements/
    ?active=true  → only active ones (used by frontend bar)
    """
    qs = Announcement.objects.all()
    if request.query_params.get('active', '').lower() == 'true':
        qs = qs.filter(is_active=True)
    return Response(AnnouncementSerializer(qs, many=True).data)


# ── Admin CRUD ────────────────────────────────────────────────────────────────
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])  
def admin_announcement_list(request):
    """
    GET  /api/announcements/admin/   → all announcements
    POST /api/announcements/admin/   → create new
    """
    if request.method == 'GET':
        qs  = Announcement.objects.all()
        return Response(AnnouncementSerializer(qs, many=True).data)

    ser = AnnouncementSerializer(data=request.data)
    if ser.is_valid():
        ser.save()
        return Response(ser.data, status=status.HTTP_201_CREATED)
    return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([AllowAny])
def admin_announcement_detail(request, pk: int):
    """
    GET    /api/announcements/admin/<pk>/
    PATCH  /api/announcements/admin/<pk>/  → update fields
    DELETE /api/announcements/admin/<pk>/
    """
    try:
        obj = Announcement.objects.get(pk=pk)
    except Announcement.DoesNotExist:
        return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(AnnouncementSerializer(obj).data)

    if request.method == 'PATCH':
        ser = AnnouncementSerializer(obj, data=request.data, partial=True)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE
    obj.delete()
    return Response({'deleted': True, 'id': pk}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def admin_announcement_toggle(request, pk: int):
    """
    POST /api/announcements/admin/<pk>/toggle/
    Flips is_active on/off.
    """
    try:
        obj = Announcement.objects.get(pk=pk)
    except Announcement.DoesNotExist:
        return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    obj.is_active = not obj.is_active
    obj.save(update_fields=['is_active'])
    return Response({'id': obj.pk, 'is_active': obj.is_active})


