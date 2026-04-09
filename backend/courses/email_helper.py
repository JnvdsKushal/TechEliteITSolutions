"""
courses/email_helper.py

Reusable email notification utility for TechElite.
Sends beautifully formatted HTML emails to all admins
whenever a booking or contact form is submitted.
"""

import logging
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

logger = logging.getLogger(__name__)


def _get_admin_emails():
    """
    Returns list of admin emails from settings.
    Supports both ADMIN_EMAILS (list) and ADMIN_EMAIL (single string).
    """
    if hasattr(settings, 'ADMIN_EMAILS'):
        return settings.ADMIN_EMAILS
    if hasattr(settings, 'ADMIN_EMAIL'):
        return [settings.ADMIN_EMAIL]
    return []


# ── Booking Email ─────────────────────────────────────────────────────────────

def send_booking_email(data: dict) -> bool:
    """
    Send a booking notification email to all admins.

    Expected keys in data:
        booking_type, name, email, phone, course, mode,
        preferred_date, preferred_time, message, received_at
    """
    try:
        recipients = _get_admin_emails()
        if not recipients:
            logger.warning("[Email] No admin emails configured in settings.")
            return False

        subject = f"🔔 New Booking — {data.get('booking_type', 'Demo')} | TechElite"

        # ── Plain text fallback ───────────────────────────────────────────
        text_body = f"""
New Booking Request — TechElite IT Solutions

Booking Type   : {data.get('booking_type', 'N/A')}
Course         : {data.get('course', 'N/A')}
Mode           : {data.get('mode', 'N/A')}
Preferred Date : {data.get('preferred_date', 'N/A')}
Preferred Time : {data.get('preferred_time', 'N/A')}

Student Details
---------------
Name  : {data.get('name', 'N/A')}
Email : {data.get('email', 'N/A')}
Phone : {data.get('phone', 'N/A')}

Message
-------
{data.get('message', 'No additional notes')}

Received At : {data.get('received_at', 'N/A')}

Please login to the admin panel to confirm or cancel this booking.
        """.strip()

        # ── HTML email ────────────────────────────────────────────────────
        html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #f0f4f8;
      padding: 24px 16px;
    }}
    .container {{
      max-width: 620px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0,0,0,0.10);
    }}
    .header {{
      background: linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%);
      padding: 36px 40px;
      text-align: center;
    }}
    .header-icon {{
      font-size: 40px;
      display: block;
      margin-bottom: 12px;
    }}
    .header h1 {{
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.3px;
      margin-bottom: 6px;
    }}
    .header p {{
      color: rgba(255,255,255,0.75);
      font-size: 14px;
    }}
    .badge {{
      display: inline-block;
      background: rgba(255,255,255,0.2);
      color: #fff;
      padding: 5px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      margin-top: 14px;
      border: 1px solid rgba(255,255,255,0.3);
    }}
    .body {{
      padding: 36px 40px;
    }}
    .alert-box {{
      background: #fef9c3;
      border: 1px solid #fde047;
      border-radius: 10px;
      padding: 14px 18px;
      text-align: center;
      font-size: 14px;
      color: #713f12;
      font-weight: 500;
      margin-bottom: 28px;
    }}
    .section {{
      margin-bottom: 28px;
    }}
    .section-title {{
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #6366f1;
      margin-bottom: 14px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e0e7ff;
    }}
    .row {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 11px 0;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
      gap: 16px;
    }}
    .row:last-child {{ border-bottom: none; }}
    .label {{
      color: #64748b;
      font-weight: 500;
      min-width: 140px;
      flex-shrink: 0;
    }}
    .value {{
      color: #1e293b;
      font-weight: 600;
      text-align: right;
      word-break: break-word;
    }}
    .message-box {{
      background: #f5f7ff;
      border-left: 4px solid #6366f1;
      border-radius: 0 10px 10px 0;
      padding: 16px 18px;
      color: #334155;
      font-size: 14px;
      line-height: 1.7;
      margin-top: 10px;
    }}
    .cta {{
      text-align: center;
      margin: 28px 0 8px;
    }}
    .cta a {{
      background: linear-gradient(135deg, #1d4ed8, #4f46e5);
      color: #ffffff;
      padding: 14px 36px;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      display: inline-block;
      letter-spacing: 0.3px;
    }}
    .received {{
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      margin-top: 18px;
    }}
    .footer {{
      background: #f8fafc;
      padding: 20px 40px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
      line-height: 1.6;
    }}
  </style>
</head>
<body>
  <div class="container">

    <!-- Header -->
    <div class="header">
      <span class="header-icon">🔔</span>
      <h1>New Booking Request</h1>
      <p>TechElite IT Solutions</p>
      <span class="badge">{data.get('booking_type', 'Demo Class')}</span>
    </div>

    <!-- Body -->
    <div class="body">

      <!-- Alert -->
      <div class="alert-box">
        ⚡ A new booking has been submitted — please respond promptly!
      </div>

      <!-- Course Details -->
      <div class="section">
        <div class="section-title">🎯 Course Details</div>
        <div class="row">
          <span class="label">Course</span>
          <span class="value">{data.get('course', 'N/A')}</span>
        </div>
        <div class="row">
          <span class="label">Mode</span>
          <span class="value">{data.get('mode', 'N/A')}</span>
        </div>
        <div class="row">
          <span class="label">Preferred Date</span>
          <span class="value">{data.get('preferred_date', 'Not specified')}</span>
        </div>
        <div class="row">
          <span class="label">Preferred Time</span>
          <span class="value">{data.get('preferred_time', 'Not specified')}</span>
        </div>
      </div>

      <!-- Student Details -->
      <div class="section">
        <div class="section-title">👤 Student Details</div>
        <div class="row">
          <span class="label">Name</span>
          <span class="value">{data.get('name', 'N/A')}</span>
        </div>
        <div class="row">
          <span class="label">Email</span>
          <span class="value">{data.get('email', 'N/A')}</span>
        </div>
        <div class="row">
          <span class="label">Phone</span>
          <span class="value">{data.get('phone', 'N/A')}</span>
        </div>
      </div>

      <!-- Message -->
      <div class="section">
        <div class="section-title">💬 Message from Student</div>
        <div class="message-box">
          {data.get('message', 'No additional notes provided.')}
        </div>
      </div>

      <!-- CTA -->
      <div class="cta">
        <a href="https://techelite-backend.onrender.com/admin/">
          Open Admin Panel →
        </a>
      </div>

      <p class="received">🕐 Received at {data.get('received_at', 'N/A')}</p>

    </div>

    <!-- Footer -->
    <div class="footer">
      © 2026 TechElite IT Solutions<br>
      This is an automated notification. Do not reply to this email.
    </div>

  </div>
</body>
</html>
        """.strip()

        email = EmailMultiAlternatives(
            subject=subject,
            body=text_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=recipients,
        )
        email.attach_alternative(html_body, "text/html")
        email.send(fail_silently=False)

        logger.info(f"[Email] Booking notification sent to {recipients} for {data.get('name')}")
        return True

    except Exception as e:
        logger.error(f"[Email] Failed to send booking email: {e}")
        return False


# ── Contact Email ─────────────────────────────────────────────────────────────

def send_contact_email(data: dict) -> bool:
    """
    Send a contact form notification email to all admins.

    Expected keys in data:
        name, email, phone, subject, message, received_at
    """
    try:
        recipients = _get_admin_emails()
        if not recipients:
            logger.warning("[Email] No admin emails configured in settings.")
            return False

        subject = f"📬 New Contact — {data.get('subject', 'General Inquiry')} | TechElite"

        text_body = f"""
New Contact Message — TechElite IT Solutions

Name    : {data.get('name', 'N/A')}
Email   : {data.get('email', 'N/A')}
Phone   : {data.get('phone', 'Not provided')}
Subject : {data.get('subject', 'N/A')}

Message
-------
{data.get('message', 'N/A')}

Received At : {data.get('received_at', 'N/A')}
        """.strip()

        html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #f0f4f8;
      padding: 24px 16px;
    }}
    .container {{
      max-width: 620px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0,0,0,0.10);
    }}
    .header {{
      background: linear-gradient(135deg, #0f766e 0%, #0891b2 100%);
      padding: 36px 40px;
      text-align: center;
    }}
    .header-icon {{
      font-size: 40px;
      display: block;
      margin-bottom: 12px;
    }}
    .header h1 {{
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 6px;
    }}
    .header p {{
      color: rgba(255,255,255,0.75);
      font-size: 14px;
    }}
    .body {{
      padding: 36px 40px;
    }}
    .section {{
      margin-bottom: 28px;
    }}
    .section-title {{
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #0891b2;
      margin-bottom: 14px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e0f7fa;
    }}
    .row {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 11px 0;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
      gap: 16px;
    }}
    .row:last-child {{ border-bottom: none; }}
    .label {{
      color: #64748b;
      font-weight: 500;
      min-width: 140px;
      flex-shrink: 0;
    }}
    .value {{
      color: #1e293b;
      font-weight: 600;
      text-align: right;
      word-break: break-word;
    }}
    .message-box {{
      background: #f0fdfa;
      border-left: 4px solid #0891b2;
      border-radius: 0 10px 10px 0;
      padding: 16px 18px;
      color: #334155;
      font-size: 14px;
      line-height: 1.7;
      margin-top: 10px;
    }}
    .received {{
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      margin-top: 18px;
    }}
    .footer {{
      background: #f8fafc;
      padding: 20px 40px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
      line-height: 1.6;
    }}
  </style>
</head>
<body>
  <div class="container">

    <div class="header">
      <span class="header-icon">📬</span>
      <h1>New Contact Message</h1>
      <p>TechElite IT Solutions</p>
    </div>

    <div class="body">

      <div class="section">
        <div class="section-title">👤 Sender Details</div>
        <div class="row">
          <span class="label">Name</span>
          <span class="value">{data.get('name', 'N/A')}</span>
        </div>
        <div class="row">
          <span class="label">Email</span>
          <span class="value">{data.get('email', 'N/A')}</span>
        </div>
        <div class="row">
          <span class="label">Phone</span>
          <span class="value">{data.get('phone', 'Not provided')}</span>
        </div>
        <div class="row">
          <span class="label">Subject</span>
          <span class="value">{data.get('subject', 'N/A')}</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">💬 Message</div>
        <div class="message-box">
          {data.get('message', 'No message provided.')}
        </div>
      </div>

      <p class="received">🕐 Received at {data.get('received_at', 'N/A')}</p>

    </div>

    <div class="footer">
      © 2026 TechElite IT Solutions<br>
      This is an automated notification. Do not reply to this email.
    </div>

  </div>
</body>
</html>
        """.strip()

        email = EmailMultiAlternatives(
            subject=subject,
            body=text_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=recipients,
        )
        email.attach_alternative(html_body, "text/html")
        email.send(fail_silently=False)

        logger.info(f"[Email] Contact notification sent to {recipients} for {data.get('name')}")
        return True

    except Exception as e:
        logger.error(f"[Email] Failed to send contact email: {e}")
        return False