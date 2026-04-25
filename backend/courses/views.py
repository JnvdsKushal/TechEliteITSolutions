"""
courses/views.py
"""

import uuid
from datetime import datetime
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User as DjangoUser

from .models import Course, Booking, ContactMessage, AuthToken
from .serializers import (
    CourseSerializer, CourseListSerializer,
    BookingSerializer,
)
from .email_helper import send_booking_email, send_contact_email


# ── Token helpers ─────────────────────────────────────────────────────────────

def _get_user_from_request(request):
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return None
    token = auth_header.split(' ', 1)[1].strip()
    try:
        return AuthToken.objects.select_related('user').get(token=token).user
    except AuthToken.DoesNotExist:
        return None


# ── Auth ──────────────────────────────────────────────────────────────────────

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    name     = request.data.get('name', '')
    email    = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=400)

    email = email.strip().lower()

    if DjangoUser.objects.filter(email=email).exists():
        return Response({"error": "User already exists"}, status=400)

    user = DjangoUser.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=name,
    )
    return Response({
        "message": "Registered successfully",
        "user": {"id": user.id, "name": user.first_name, "email": user.email}
    }, status=201)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email    = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    email = email.strip().lower()

    try:
        user = DjangoUser.objects.get(email__iexact=email)
    except DjangoUser.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=401)

    if not user.check_password(password):
        return Response({"error": "Invalid credentials"}, status=401)

    AuthToken.objects.filter(user=user).delete()
    token = str(uuid.uuid4())
    AuthToken.objects.create(user=user, token=token)

    return Response({
        "token": token,
        "user": {
            "id":           user.id,
            "name":         user.get_full_name() or user.first_name or user.username,
            "email":        user.email,
            "phone":        "",
            "is_staff":     user.is_staff,
            "is_admin":     user.is_staff,
            "is_superuser": user.is_superuser,
        }
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def logout(request):
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        token = auth_header.split(' ', 1)[1].strip()
        AuthToken.objects.filter(token=token).delete()
    return Response({"message": "Logged out successfully"})


# ── Profile ───────────────────────────────────────────────────────────────────

@api_view(['GET', 'PATCH'])
@permission_classes([AllowAny])
def profile(request):
    user = _get_user_from_request(request)
    if user is None:
        return Response({"error": "Authentication required."}, status=401)

    if request.method == 'GET':
        return Response({
            "id":          user.id,
            "name":        user.get_full_name() or user.first_name or user.username,
            "email":       user.email,
            "phone":       "",
            "date_joined": user.date_joined.strftime("%B %Y"),
        })

    if 'name' in request.data:
        parts = request.data['name'].strip().split(' ', 1)
        user.first_name = parts[0]
        user.last_name  = parts[1] if len(parts) > 1 else ''
        user.save()

    return Response({
        "id":          user.id,
        "name":        user.get_full_name() or user.first_name or user.username,
        "email":       user.email,
        "phone":       "",
        "date_joined": user.date_joined.strftime("%B %Y"),
    })


# ── My Enrollments ────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([AllowAny])
def my_enrollments(request):
    user = _get_user_from_request(request)
    if user is None:
        return Response({"error": "Authentication required."}, status=401)

    bookings = (
        Booking.objects
        .filter(booking_type='enrollment', email__iexact=user.email)
        .select_related('course')
        .order_by('-created_at')
    )

    data = []
    for b in bookings:
        if b.course:
            course_title = b.course.title
            course_type  = b.course.course_type
            duration     = b.course.duration
        else:
            parts        = b.message.split('|')
            course_title = parts[0].replace('Course:', '').strip() if parts else 'Unknown Course'
            course_type  = 'online'
            duration     = ''

        data.append({
            "id":             b.id,
            "course_title":   course_title,
            "course_type":    course_type,
            "duration":       duration,
            "status":         b.status,
            "enrolled_on":    b.created_at.strftime("%d %b %Y"),
            "preferred_date": str(b.preferred_date) if b.preferred_date else None,
        })

    return Response(data)


# ── Contact ───────────────────────────────────────────────────────────────────

@api_view(['POST'])
@permission_classes([AllowAny])
def contact(request):
    from .serializers import ContactMessageSerializer
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        obj = serializer.save()

        send_contact_email({
            "name":        obj.name,
            "email":       obj.email,
            "phone":       obj.phone or "Not provided",
            "subject":     obj.subject,
            "message":     obj.message,
            "received_at": datetime.now().strftime("%d %b %Y, %I:%M %p"),
        })

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ── Admin: Enrollments ────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([AllowAny])
def admin_enrollment_list(request):
    qs = Booking.objects.filter(booking_type='enrollment').order_by('-created_at')
    return Response(BookingSerializer(qs, many=True).data)


@api_view(['GET', 'PATCH'])
@permission_classes([AllowAny])
def admin_enrollment_detail(request, pk: int):
    try:
        obj = Booking.objects.get(pk=pk, booking_type='enrollment')
    except Booking.DoesNotExist:
        return Response({'error': 'Not found.'}, status=404)
    if request.method == 'GET':
        return Response(BookingSerializer(obj).data)
    ser = BookingSerializer(obj, data=request.data, partial=True)
    if ser.is_valid():
        ser.save()
        return Response(ser.data)
    return Response(ser.errors, status=400)


# ── Admin: Course CRUD ────────────────────────────────────────────────────────

class AdminCourseListCreateView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    def get_queryset(self):
        return Course.objects.all()


class AdminCourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    lookup_field = 'slug'


# ── Admin: Bookings ───────────────────────────────────────────────────────────

class AdminBookingListView(generics.ListAPIView):
    serializer_class = BookingSerializer
    def get_queryset(self):
        return Booking.objects.select_related('course').order_by('-created_at')


class AdminBookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()


# ── Admin: Stats ──────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([AllowAny])
def admin_stats(request):
    pending   = Booking.objects.filter(status='pending').count()
    confirmed = Booking.objects.filter(status='confirmed').count()
    cancelled = Booking.objects.filter(status='cancelled').count()
    recent    = Booking.objects.select_related('course').order_by('-created_at')[:5]
    return Response({
        'total_courses':      Course.objects.count(),
        'active_courses':     Course.objects.filter(is_active=True).count(),
        'online_courses':     Course.objects.filter(is_active=True, course_type='online').count(),
        'offline_courses':    Course.objects.filter(is_active=True, course_type='offline').count(),
        'total_bookings':     Booking.objects.count(),
        'pending_bookings':   pending,
        'confirmed_bookings': confirmed,
        'cancelled_bookings': cancelled,
        'total_students':     DjangoUser.objects.count(),
        'recent_bookings':    BookingSerializer(recent, many=True).data,
    })


# ── Public: Courses ───────────────────────────────────────────────────────────

class CourseListView(generics.ListAPIView):
    serializer_class = CourseListSerializer
    def get_queryset(self):
        return Course.objects.filter(is_active=True)


class CourseDetailView(generics.RetrieveAPIView):
    serializer_class = CourseSerializer
    queryset = Course.objects.filter(is_active=True)
    lookup_field = 'slug'


@api_view(['GET'])
@permission_classes([AllowAny])
def online_courses(request):
    courses = Course.objects.filter(is_active=True, course_type='online')
    return Response(CourseListSerializer(courses, many=True).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def offline_courses(request):
    courses = Course.objects.filter(is_active=True, course_type='offline')
    return Response(CourseListSerializer(courses, many=True).data)


# ── Public: Bookings ──────────────────────────────────────────────────────────

class BookingCreateView(generics.CreateAPIView):
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save()

        booking_labels = {
            'demo':         'Free Demo Class',
            'consultation': 'Free Consultation',
            'enrollment':   'Course Enrollment',
        }
        label = booking_labels.get(obj.booking_type, obj.booking_type.title())

        if obj.course:
            course_name = obj.course.title
        else:
            course_name = (
                request.data.get('course_title')
                or request.data.get('course')
                or 'Not specified'
            )

        if obj.course:
            raw_mode = obj.course.course_type
        else:
            raw_mode = (
                request.data.get('mode')
                or request.data.get('course_type')
                or 'Not specified'
            )

        mode = raw_mode.title() if raw_mode != 'Not specified' else raw_mode

        if obj.preferred_date:
            preferred = obj.preferred_date.strftime("%d %b %Y")
        else:
            preferred = request.data.get('date') or 'Not specified'

        preferred_time = (
            request.data.get('preferred_time')
            or request.data.get('time')
            or 'Not specified'
        )

        send_booking_email({
            "booking_type":   label,
            "name":           obj.name,
            "email":          obj.email,
            "phone":          obj.phone,
            "course":         course_name,
            "mode":           mode,
            "preferred_date": preferred,
            "preferred_time": preferred_time,
            "message":        obj.message or "No additional notes",
            "received_at":    datetime.now().strftime("%d %b %Y, %I:%M %p"),
        })

        return Response(
            {'message': 'Booking submitted successfully!', 'data': serializer.data},
            status=status.HTTP_201_CREATED,
        )


# ── Public: Stats ─────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([AllowAny])
def site_stats(request):
    return Response({
        'total_courses':   Course.objects.filter(is_active=True).count(),
        'online_courses':  Course.objects.filter(is_active=True, course_type='online').count(),
        'offline_courses': Course.objects.filter(is_active=True, course_type='offline').count(),
        'total_bookings':  Booking.objects.count(),
    })