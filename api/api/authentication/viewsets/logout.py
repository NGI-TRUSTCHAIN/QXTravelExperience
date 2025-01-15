from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from api.authentication.models import ActiveSession


class LogoutViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        user = request.user

        sessions = ActiveSession.objects.filter(user=user)
        sessions.delete()

        Token.objects.filter(user=user).delete()

        return Response(
            {"success": True, "msg": "Sessions and tokens revoked"}, status=status.HTTP_200_OK
        )
