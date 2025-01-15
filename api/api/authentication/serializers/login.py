import jwt
from rest_framework import serializers, exceptions
from django.contrib.auth import authenticate
from datetime import datetime, timedelta
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import QuerySet
from api.authentication.models import ActiveSession
from typing import Dict, Any
from django.contrib.auth.models import User

def _generate_jwt_token(user: User) -> str:
    token: str = jwt.encode(
        {"id": user.pk, "exp": datetime.utcnow() + timedelta(days=7)}, # TODO:: Signature verification failed
        settings.SECRET_KEY,
    )

    return token


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data: Dict[str, Any]) -> Dict[str, Any]:
        email: str = data.get("email", None)
        password: str = data.get("password", None)

        if email is None:
            raise exceptions.ValidationError(
                {"success": False, "msg": "Email is required to login"}
            )
        if password is None:
            raise exceptions.ValidationError(
                {"success": False, "msg": "Password is required to log in."}
            )
        user: User = authenticate(username=email, password=password)

        if user is None:
            raise exceptions.AuthenticationFailed({"success": False, "msg": "Wrong credentials"})

        if not user.is_active:
            raise exceptions.ValidationError(
                {"success": False, "msg": "User is not active"}
            )

        try:
            sessions: QuerySet[ActiveSession] = ActiveSession.objects.filter(user=user)
            if sessions:
                session: ActiveSession = sessions.first()
                if not session.token:
                    raise ValueError
                jwt.decode(session.token, settings.SECRET_KEY, algorithms=["HS256"])
            else:
                raise ObjectDoesNotExist

        except (ObjectDoesNotExist, ValueError, jwt.ExpiredSignatureError):
            session: ActiveSession = ActiveSession.objects.create(
                user=user, token=_generate_jwt_token(user)
            )

        return {
            "success": True,
            "token": session.token,
            "user": {"_id": user.pk, "email": user.email},
        }
