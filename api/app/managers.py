from django.contrib.auth.models import BaseUserManager, AbstractUser
from django.db import models
from django.db.models import QuerySet
from typing import Any, Optional


class UserManager(BaseUserManager):
    def create_user(self, email: str, password: Optional[str] = None, **kwargs: Any) -> AbstractUser:
        """Create and return a `User` with an email and password."""

        if email is None:
            raise TypeError("Users must have an email.")

        user = self.model(email=self.normalize_email(email), is_customer=False)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, password: str) -> AbstractUser:
        """
        Create and return a `User` with superuser (admin) permissions.
        """


        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user