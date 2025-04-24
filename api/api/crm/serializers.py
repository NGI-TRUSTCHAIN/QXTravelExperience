from app.models import CustomerProfile
from rest_framework import serializers
from typing import Dict, Any

class CrmSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = CustomerProfile
        fields = ["id", "user_id", "first_name", "last_name", "profile_picture", "reward_points", 
                 "phone_number", "birthday", "anonymous", "blockchain_address", "active", "created_at", "updated_at", "last_check_in"]
        read_only_fields = fields

    def to_representation(self, instance: CustomerProfile) -> Dict[str, Any]:
        data = super().to_representation(instance)
        if instance.anonymous:
            personal_fields = ["first_name", "last_name", "profile_picture", "phone_number", "birthday", "blockchain_address"]
            for field in personal_fields:
                data[field] = "Anonymous"
        return data