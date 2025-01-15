from django.core.mail import send_mail
from django.utils.safestring import mark_safe
from drfpasswordless.settings import api_settings
from django.template import loader
from core.settings import FRONT_WALLET_URL, MAIN_URL
from django.core.signing import TimestampSigner
import base64
from typing import Any, Dict
from app.models import User

def send_email_with_callback_token(user: User, email_token: Any, **kwargs: Dict[str, Any]) -> bool:
    """
    Sends a Email to user.email.

    Passes silently without sending in test environment
    """

    try:
        if api_settings.PASSWORDLESS_EMAIL_NOREPLY_ADDRESS:
            # Make sure we have a sending address before sending.

            # Get email subject and message
            email_subject: str = kwargs.get('email_subject',
                                       api_settings.PASSWORDLESS_EMAIL_SUBJECT)
            email_plaintext: str = kwargs.get('email_plaintext',
                                         api_settings.PASSWORDLESS_EMAIL_PLAINTEXT_MESSAGE)
            email_html: str = kwargs.get('email_html',
                                    api_settings.PASSWORDLESS_EMAIL_TOKEN_HTML_TEMPLATE_NAME)

            # Inject context if user specifies.
            login_link: str = f'{FRONT_WALLET_URL}/wallet-view/?code={email_token.key}&email={user.email}'
            html_message: str = loader.render_to_string(email_html, {'login_link': mark_safe(login_link)})
            send_mail(
                email_subject,
                email_plaintext % email_token.key,
                api_settings.PASSWORDLESS_EMAIL_NOREPLY_ADDRESS,
                [getattr(user, api_settings.PASSWORDLESS_USER_EMAIL_FIELD_NAME)],
                fail_silently=False,
                html_message=html_message)

        else:
            return False
        return True

    except Exception:
        return False
    
def send_email_change_confirmation(user, new_email, old_email):
    signer = TimestampSigner()
    encoded_emails = base64.urlsafe_b64encode(f"{old_email}|{new_email}".encode()).decode()
    token = signer.sign(encoded_emails)
    verification_link = f"{MAIN_URL}/api/email/verify?token={token}"

    subject = "Confirm your new email address"
    
    html_message = loader.render_to_string("core/confirm_email_changed.html", {
        'verification_link': verification_link,
        'old_email': old_email,
        'new_email': new_email,
    })
    
    send_mail(
        subject,
        '',
        api_settings.PASSWORDLESS_EMAIL_NOREPLY_ADDRESS,
        [new_email],
        html_message=html_message,
    )

    # Send notification to old email
    old_email_subject = "Your email address is being changed"
    old_email_message = f"A request has been made to change your email address from {old_email} to {new_email}. If you didn't make this request, please contact support immediately."
    send_mail(old_email_subject, old_email_message, api_settings.PASSWORDLESS_EMAIL_NOREPLY_ADDRESS, [old_email])