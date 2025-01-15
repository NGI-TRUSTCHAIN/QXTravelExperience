from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from app.models import User
from typing import Dict, Any


class RegisterSerializer(serializers.ModelSerializer):
    password: serializers.CharField = serializers.CharField(min_length=4, max_length=128, write_only=True)
    email: serializers.EmailField = serializers.EmailField(required=True)

    class Meta:
        model: User = User
        fields: list[str] = ["id", "password", "email", "is_active", "date"]

    def validate_email(self, value: str) -> str:
        try:
            User.objects.get(email=value)
        except ObjectDoesNotExist:
            return value
        raise ValidationError({"success": False, "msg": "Email already taken."})
    
    def validate_password(self, value: str) -> str:
        if len(value) < 25:
            raise ValidationError({"success": False, "msg": "Password must be at least 25 characters."})
        return value

    def create(self, validated_data: Dict[str, Any]) -> User:
        return User.objects.create_user(**validated_data)
