from api.crm.viewsets import CrmViewSet
from api.authentication.viewsets import (
    RegisterViewSet,
    LoginViewSet,
    ActiveSessionViewSet,
    LogoutViewSet,
)
from rest_framework import routers
from api.blockchain.viewsets import BlockchainViewSet
from api.user.viewsets import UserViewSet, CustomerViewSet, VerifyEmailViewSet, CustomObtainAuthToken
from django.urls import path, include
from drfpasswordless.views import ObtainEmailCallbackToken

from api.user.viewsets import CustomerViewSet

router = routers.SimpleRouter(trailing_slash=False)

# Authentication
router.register(r"users/register", RegisterViewSet, basename="register")
router.register(r"users/login", LoginViewSet, basename="login")
router.register(r"users/checkSession", ActiveSessionViewSet, basename="check-session")
router.register(r"users/logout", LogoutViewSet, basename="logout")

# User
router.register(r"user", CustomerViewSet, basename="user")

# CRM
router.register(r"crm", CrmViewSet, basename="crm")
# Blockchain
router.register(r"blockchain", BlockchainViewSet, basename="blockchain")

urlpatterns = [
    *router.urls,
    # Custom implementation of auth token endpoint
    path('customer/auth/token/', CustomObtainAuthToken.as_view(), name='auth-token'),
    # Other drfpasswordless endpoints
    path('customer/auth/email/', ObtainEmailCallbackToken.as_view(), name='auth-email'),
    # check session endpoint
    path('customer/auth/checkSession/', CustomerViewSet.as_view({'get': 'check_session'}), name='check-session'),
]
