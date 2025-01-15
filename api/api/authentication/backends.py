import jwt
from typing import Optional, Tuple

from rest_framework import authentication, exceptions
from rest_framework.request import Request
from django.conf import settings

from app.models import User
from api.authentication.models import ActiveSession


class ActiveSessionAuthentication(authentication.BaseAuthentication):

    auth_error_message: dict = {"success": False, "msg": "User is not logged on."}

    def authenticate(self, request: Request) -> Optional[Tuple[User, str]]:

        request.user = None

        auth_header: bytes = authentication.get_authorization_header(request)

        if not auth_header:
            return None

        token: str = auth_header.decode("utf-8")

        return self._authenticate_credentials(token)

    def _authenticate_credentials(self, token: str) -> Tuple[User, str]:

        try:
            jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except:
            raise exceptions.AuthenticationFailed(self.auth_error_message)

        try:
            active_session: ActiveSession = ActiveSession.objects.get(token=token)
        except:
            raise exceptions.AuthenticationFailed(self.auth_error_message)

        try:
            user: User = active_session.user
        except User.DoesNotExist:
            msg: dict = {"success": False, "msg": "No user matching this token was found."}
            raise exceptions.AuthenticationFailed(msg)

        if not user.is_active:
            msg: dict = {"success": False, "msg": "This user has been deactivated."}
            raise exceptions.AuthenticationFailed(msg)

        return (user, token)
