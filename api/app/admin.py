from django.contrib import admin
from .models import User, CustomerProfile
from api.authentication.models import ActiveSession

class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'blockchain_address']
    exclude = ['private_key', 'mnemonic']

admin.site.register(User)
admin.site.register(CustomerProfile, CustomerProfileAdmin)
admin.site.register(ActiveSession)