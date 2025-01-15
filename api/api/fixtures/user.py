from app.models import User

user_data = {"password": "12345678", "email": "teast@admin.com"}

User.objects.create_user(**user_data)
