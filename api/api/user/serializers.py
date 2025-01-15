from app.models import User, CustomerProfile
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "date"]
        read_only_field = ["id"]

class CustomerProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    profile_picture = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = CustomerProfile
        fields = ['email', 'first_name', 'last_name', 'phone_number', 'birthday', 'profile_picture']
