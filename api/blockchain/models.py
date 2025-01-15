from django.db import models

class Network(models.Model):
    name = models.CharField(max_length=100)
    chain_id = models.IntegerField()
    rpc_url = models.URLField()
    currency_symbol = models.CharField(max_length=10)

class Token(models.Model):
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10)
    decimals = models.IntegerField(default=18)
    total_supply = models.BigIntegerField(default=0)
    mintable = models.BooleanField(default=False)
    burnable = models.BooleanField(default=False)
    transferable = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    address = models.CharField(max_length=100)
    abi = models.TextField()

    # Relationships
    network = models.ForeignKey(Network, on_delete=models.SET_NULL, related_name='tokens', null=True, blank=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Reward(models.Model):
    name = models.CharField(max_length=100)
    amount = models.IntegerField(default=1)
    data = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    tx_hash = models.CharField(max_length=100, unique=True)
    from_address = models.CharField(max_length=100)
    to_address = models.CharField(max_length=100)
    value = models.BigIntegerField()
    gas_price = models.BigIntegerField()
    gas_used = models.BigIntegerField()
    status = models.BooleanField(default=False)
    data = models.JSONField(blank=True, null=True)

    # Relationships
    token = models.ForeignKey(Token, on_delete=models.SET_NULL, related_name='transactions', null=True, blank=True)
    reward = models.ForeignKey(Reward, on_delete=models.SET_NULL, related_name='transactions', null=True, blank=True)
    customer = models.ForeignKey('app.CustomerProfile', on_delete=models.SET_NULL, related_name='transactions', null=True, blank=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tx_hash