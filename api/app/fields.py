from django.db import models
from cryptography.fernet import Fernet
from core.settings import FERNET_KEY

class EncryptedTextField(models.TextField):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fernet = Fernet(FERNET_KEY)

    def get_prep_value(self, value):
        if value is not None:
            encrypted_value = self.fernet.encrypt(value.encode())
            return encrypted_value.decode()
        return value

    def from_db_value(self, value, expression, connection):
        if value is not None:
            decrypted_value = self.fernet.decrypt(value.encode())
            return decrypted_value.decode()
        return value