from django.contrib import admin
from .models import Network, Token, Reward, Transaction, DID

admin.site.register(Network)
admin.site.register(Token)
admin.site.register(Reward)
admin.site.register(Transaction)
admin.site.register(DID)
