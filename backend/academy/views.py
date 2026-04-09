"""
SAVE THIS FILE AS: users/views.py
(the same file where your existing register/login/contact views live)
"""

import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User as DjangoUser
from .models import Contact
from .serializers import ContactSerializer

# ── Shared in-memory token store ─────────────────────────────────────────────
# NOTE: This resets on every server restart. For production, store tokens in
# the database or use Redis. For now it matches your existing setup exactly.
_TOKENS: dict[str, int] = {}   # token → user.id


def _get_user_from_request(request) -> DjangoUser | None:
    """Helper: extract and validate the Bearer token from the request header."""
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return None
    token = auth_header.split(' ', 1)[1].strip()
    user_id = _TOKENS.get(token)
    if user_id is None:
        return None
    try:
        return DjangoUser.objects.get(pk=user_id)
    except DjangoUser.DoesNotExist:
        return None


# ── Auth ──────────────────────────────────────────────────────────────────────

@api_view(['POST'])
def register(request):
    name     = request.data.get('name', '')
    email    = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=400)

    if DjangoUser.objects.filter(username=email).exists():
        return Response({"error": "User already exists"}, status=400)

    user = DjangoUser.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=name,
    )

    return Response({
        "message": "Registered successfully",
        "user": {
            "id": user.id,
            "name": user.first_name,
            "email": user.email,
        }
    }, status=201)


@api_view(['POST'])
def login(request):
    email    = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    user = authenticate(username=email, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=401)

    token = str(uuid.uuid4())
    _TOKENS[token] = user.id

    return Response({
        "token": token,
        "user": {
            "id": user.id,
            "name": user.get_full_name() or user.first_name or user.username,
            "email": user.email,
            "phone": "",          # UserProfile can extend this later
            "is_staff": user.is_staff,
            "is_admin": user.is_staff,
            "is_superuser": user.is_superuser,
        }
    })


@api_view(['POST'])
def logout(request):
    """DELETE the token so it can no longer be used."""
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        token = auth_header.split(' ', 1)[1].strip()
        _TOKENS.pop(token, None)
    return Response({"message": "Logged out successfully"})


# ── Profile ───────────────────────────────────────────────────────────────────

@api_view(['GET', 'PATCH'])
def profile(request):
    """
    GET   /api/auth/profile/  → returns logged-in user's info
    PATCH /api/auth/profile/  → updates name / phone (email is read-only)

    Requires header:  Authorization: Bearer <token>
    """
    user = _get_user_from_request(request)
    if user is None:
        return Response({"error": "Authentication required."}, status=401)

    if request.method == 'GET':
        return Response({
            "id":         user.id,
            "name":       user.get_full_name() or user.first_name or user.username,
            "email":      user.email,
            "phone":      getattr(user, 'profile', None) and user.profile.phone or "",
            "date_joined": user.date_joined.strftime("%B %Y"),
        })

    # PATCH — update allowed fields only
    data = request.data
    if 'name' in data:
        parts = data['name'].strip().split(' ', 1)
        user.first_name = parts[0]
        user.last_name  = parts[1] if len(parts) > 1 else ''
    # email intentionally NOT updatable here (use a separate verify flow)
    user.save()

    return Response({
        "id":         user.id,
        "name":       user.get_full_name() or user.first_name or user.username,
        "email":      user.email,
        "phone":      "",
        "date_joined": user.date_joined.strftime("%B %Y"),
    })


# ── Enrolled courses (bookings with booking_type='enrollment') ────────────────

@api_view(['GET'])
def my_enrollments(request):
    """
    GET /api/auth/enrollments/

    Returns all bookings with booking_type='enrollment' whose email
    matches the logged-in user's email.

    Requires header:  Authorization: Bearer <token>
    """
    from courses.models import Booking   # adjust app label if different
    from courses.serializers import BookingSerializer

    user = _get_user_from_request(request)
    if user is None:
        return Response({"error": "Authentication required."}, status=401)

    enrollments = (
        Booking.objects
        .filter(booking_type='enrollment', email__iexact=user.email)
        .select_related('course')
        .order_by('-created_at')
    )

    data = []
    for b in enrollments:
        data.append({
            "id":           b.id,
            "course_title": b.course.title if b.course else b.message.split('|')[0].replace('Course:', '').strip(),
            "course_type":  b.course.course_type if b.course else "online",
            "duration":     b.course.duration if b.course else "",
            "status":       b.status,           # pending / confirmed / cancelled
            "enrolled_on":  b.created_at.strftime("%d %b %Y"),
            "preferred_date": str(b.preferred_date) if b.preferred_date else None,
        })

    return Response(data)


# ── Contact ───────────────────────────────────────────────────────────────────

@api_view(['POST'])
def contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)