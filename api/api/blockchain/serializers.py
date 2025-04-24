from rest_framework import serializers
from blockchain.models import Token, Transaction, Network, DID

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = [
            'id', 'name', 'symbol', 'decimals', 'total_supply', 'mintable', 
            'burnable', 'transferable', 'active', 'network_id', 'created_at', 'updated_at',
            'address'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            'id', 'tx_hash', 'from_address', 'to_address', 'value', 
            'gas_price', 'gas_used', 'status', 'data', 'token', 'reward', 
            'customer', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

class NetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Network
        fields = ['id', 'name', 'rpc_url', 'chain_id', 'currency_symbol']
        read_only_fields = ['id']

class DIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = DID
        fields = ['id', 'did', 'name', 'valid', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']