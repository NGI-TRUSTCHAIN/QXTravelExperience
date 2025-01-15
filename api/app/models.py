from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.exceptions import ObjectDoesNotExist

from .managers import UserManager
from .fields import EncryptedTextField
from blockchain.utils import generate_blockchain_keys

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    is_customer = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.is_customer:
            try:
                _ = CustomerProfile.objects.get(user=self)
            except ObjectDoesNotExist:
                CustomerProfile.objects.create(user=self)

class CustomerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='customers/profile_picture', null=True, blank=True)
    reward_points = models.IntegerField(default=0)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    birthday = models.DateField(null=True, blank=True)
    anonymous = models.BooleanField(default=False)
    blockchain_address = models.CharField(max_length=42, blank=True, null=True, unique=True)
    private_key = EncryptedTextField(max_length=256, blank=True, null=True)
    mnemonic = EncryptedTextField(max_length=256, blank=True, null=True)
    active = models.BooleanField(default=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_check_in = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.blockchain_address}"
    
    def save(self, *args, **kwargs):
        if not self.blockchain_address and not self.private_key and not self.mnemonic:
            mnemonic, private_key, public_key = generate_blockchain_keys()
            self.blockchain_address = public_key
            self.private_key = private_key
            self.mnemonic = mnemonic
        super().save(*args, **kwargs)
