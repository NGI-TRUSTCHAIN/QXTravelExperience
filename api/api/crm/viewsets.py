from api.crm.serializers import CrmSerializer
from app.models import CustomerProfile
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class CrmViewSet(viewsets.ModelViewSet):
    queryset = CustomerProfile.objects.all()
    serializer_class = CrmSerializer
    permission_classes = [IsAuthenticated,]
