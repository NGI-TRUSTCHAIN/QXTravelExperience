from api.authentication.viewsets import (
    RegisterViewSet,
    LoginViewSet,
    ActiveSessionViewSet,
    LogoutViewSet,
)
from rest_framework import routers
from api.blockchain.viewsets import BlockchainViewSet
from django.urls import path, include

from api.user.viewsets import CustomerViewSet

router = routers.SimpleRouter(trailing_slash=False)

# Authentication
router.register(r"users/register", RegisterViewSet, basename="register")
router.register(r"users/login", LoginViewSet, basename="login")
router.register(r"users/checkSession", ActiveSessionViewSet, basename="check-session")
router.register(r"users/logout", LogoutViewSet, basename="logout")

# User
router.register(r"user", CustomerViewSet, basename="user")

# Blockchain
router.register(r"blockchain", BlockchainViewSet, basename="blockchain")

urlpatterns = [
    *router.urls,
    path('customer/', include('drfpasswordless.urls')),
]
