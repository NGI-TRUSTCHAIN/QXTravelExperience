from typing import Any, Dict
from api.user.serializers import UserSerializer, CustomerProfileSerializer
from app.models import User, CustomerProfile
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework import mixins
from rest_framework.request import Request
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from django.core.signing import TimestampSigner
from rest_framework.permissions import AllowAny
from app.utils import send_email_change_confirmation
from django.shortcuts import render
from django.utils.html import escape
import base64
from core.settings import FRONT_WALLET_URL

class UserViewSet(
    viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.UpdateModelMixin
):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    error_message: Dict[str, Any] = {"success": False, "msg": "Error updating user"}

    def update(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        partial: bool = kwargs.pop("partial", True)
        instance: User = User.objects.get(id=request.data.get("userID"))
        serializer: UserSerializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, "_prefetched_objects_cache", None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        user_id: str = request.data.get("userID")

        if not user_id:
            raise ValidationError(self.error_message)

        if self.request.user.pk != int(user_id) and not self.request.user.is_superuser:
            raise ValidationError(self.error_message)

        self.update(request)

        return Response({"success": True}, status.HTTP_200_OK)

class CustomerViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    @action(detail=False, methods=['get'], url_path='info')
    def info(self, request, *args, **kwargs):
        try:
            customer_profile = CustomerProfile.objects.get(user=request.user)
        except CustomerProfile.DoesNotExist:
            raise NotFound({"detail": "Customer profile not found."})

        serializer = CustomerProfileSerializer(customer_profile)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='info-update')
    def update_customer_profile(self, request, *args, **kwargs):
        try:
            user = request.user
            customer_profile = CustomerProfile.objects.get(user=user)
        except CustomerProfile.DoesNotExist:
            raise NotFound({"detail": "Customer profile not found."})

        serializer = CustomerProfileSerializer(customer_profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='change-email')
    def change_email(self, request, *args, **kwargs):
        try:
            user = request.user
            new_email = request.data.get('new_email')

            if not new_email:
                raise ValidationError({"detail": "New email is required."})

            if User.objects.filter(email=new_email).exists():
                raise ValidationError({"detail": "This email is already in use."})
            
            # Send confirmation email
            send_email_change_confirmation(user, new_email, user.email)

            return Response({"detail": "Please check your new email for confirmation."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='delete-account')
    def delete_account(self, request, *args, **kwargs):
        try:
            user = request.user
            user.delete()

            return Response({"detail": "Account deleted successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class VerifyEmailViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'], url_path='verify')
    def verify(self, request, *args, **kwargs):
        token = request.query_params.get('token')
        signer = TimestampSigner()
        
        try:
            signed_data = signer.unsign(token, max_age=86400)  # 24 hours expiration
            decoded_emails = base64.urlsafe_b64decode(signed_data).decode()
            old_email, new_email = decoded_emails.split('|')
            user = User.objects.get(email__iexact=old_email)
            user.email = new_email
            user.is_active = True
            user.save()
            context = {
                "success": True,
                "message": f"Email changed from {escape(old_email)} to {escape(new_email)} and verified successfully.",
                "front_wallet_url": FRONT_WALLET_URL
            }
        except Exception as e:
            context = {
                "success": False,
                "message": "Invalid or expired token.",
                "front_wallet_url": FRONT_WALLET_URL
            }

        return render(request, 'core/email_verified.html', context)
    