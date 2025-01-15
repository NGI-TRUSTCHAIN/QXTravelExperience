from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.request import Request
from api.authentication.backends import ActiveSessionAuthentication
from blockchain.models import Network, Token, Transaction
from app.models import CustomerProfile
from blockchain.utils import get_user_balance, mint_token_to_user, generate_and_deploy_solidity_code
from api.blockchain.serializers import TokenSerializer, TransactionSerializer, NetworkSerializer

class BlockchainViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def get_customer(self, request: Request) -> tuple[CustomerProfile, Response | None]:
        try:
            customer = CustomerProfile.objects.get(user=request.user)
        except CustomerProfile.DoesNotExist:
            return None, Response(status=404, data={'error': 'Customer not found'})
        return customer, None

    @action(detail=False, methods=['get'], authentication_classes=[ActiveSessionAuthentication])
    def networks(self, request: Request) -> Response:
        networks = Network.objects.all()
        serializer = NetworkSerializer(networks, many=True)
        return Response(status=200, data=serializer.data)

    @action(detail=False, methods=['get'], authentication_classes=[ActiveSessionAuthentication])
    def tokens(self, request: Request) -> Response:
        tokens = Token.objects.all()
        serializer = TokenSerializer(tokens, many=True)
        return Response(status=200, data=serializer.data)
    
    @action(detail=False, methods=['get'], authentication_classes=[ActiveSessionAuthentication])
    def transactions(self, request: Request) -> Response:
        try:
            token_id = request.query_params.get('token_id')
            if not token_id:
                return Response(status=400, data={'error': 'token_id is required'})
            transactions = Transaction.objects.filter(token_id=token_id)
            serializer = TransactionSerializer(transactions, many=True)
            return Response(status=200, data=serializer.data)
        except Exception as e:
            return Response(status=500, data={'error': str(e)})

    @action(detail=False, methods=['get'], authentication_classes=[TokenAuthentication])
    def token_balance(self, request: Request) -> Response:
        customer, error_response = self.get_customer(request)
        if error_response:
            return error_response

        if not customer.blockchain_address:
            return Response(status=500)

        try:
            token_id = request.query_params.get('token_id', 1)
            balance = get_user_balance(token_id=token_id, user_blockchain_address=customer.blockchain_address)
        except Exception:
            return Response(status=500)

        token_decimals = Token.objects.get(id=token_id).decimals
        return Response(status=200, data={'balance': balance / 10 ** token_decimals})

    @action(detail=False, methods=['get'], authentication_classes=[TokenAuthentication])
    def token_balance_combined(self, request: Request) -> Response:
        customer, error_response = self.get_customer(request)
        if error_response:
            return error_response

        if not customer.blockchain_address:
            return Response(status=500)

        total_balance = 0
        try:
            tokens = Token.objects.all()
            for token in tokens:
                balance = get_user_balance(token_id=token.id, user_blockchain_address=customer.blockchain_address)
                total_balance += balance / (10 ** token.decimals)
        except Exception as e:
            return Response(status=500, data={'error': str(e)})

        return Response(status=200, data={'combined_balance': total_balance})

    @action(detail=False, methods=['get'], authentication_classes=[TokenAuthentication])
    def blockchain_address(self, request: Request) -> Response:
        customer, error_response = self.get_customer(request)
        if error_response:
            return error_response

        if not customer.blockchain_address:
            return Response(status=404, data={'error': 'Blockchain address not found'})

        return Response(status=200, data={'blockchain_address': customer.blockchain_address})

    @action(detail=False, methods=['get'], authentication_classes=[TokenAuthentication])
    def mnemonic(self, request: Request) -> Response:
        customer, error_response = self.get_customer(request)
        if error_response:
            return error_response

        if not customer.mnemonic:
            return Response(status=404, data={'error': 'Mnemonic not found'})

        return Response(status=200, data={'mnemonic': customer.mnemonic.split()})

    @action(detail=False, methods=['get'], authentication_classes=[TokenAuthentication])
    def customer_transactions(self, request: Request) -> Response:
        customer, error_response = self.get_customer(request)
        if error_response:
            return error_response

        transactions = Transaction.objects.filter(customer=customer)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(status=200, data=serializer.data)

    @action(detail=False, methods=['post'], authentication_classes=[TokenAuthentication])
    def receive_reward(self, request: Request) -> Response:
        customer, error_response = self.get_customer(request)
        if error_response:
            return error_response

        tokenId = request.data.get('token_id', 1)
        tokenId = int(tokenId)
        amount = request.data.get('amount', 1)

        try:
            tx_receipt = mint_token_to_user(
                token_id=tokenId,
                customer=customer,
                amount=amount * (10 ** 18)
            )
            customer.reward_points += amount
            customer.save()
        except Exception as e:
            return Response(status=500, data={'error': str(e)})

        if tx_receipt['status'] == 1:
            return Response(status=200, data={'status': 1, 'reward_points': customer.reward_points})

        return Response(status=200, data={'status': 0, 'error': 'Transaction failed'})

    @action(detail=False, methods=['post'], authentication_classes=[ActiveSessionAuthentication])
    def create_token(self, request: Request) -> Response:
        name = request.data.get('name')
        symbol = request.data.get('symbol')
        decimals = request.data.get('decimals', 18)
        initial_supply = request.data.get('initial_supply', 1000000)
        mintable = request.data.get('mintable', True)
        burnable = request.data.get('burnable', True)
        transferable = request.data.get('transferable', True)
        pausable = request.data.get('pausable', True)

        if not all([name, symbol]):
            return Response(status=400, data={'error': 'name and token_symbol are required'})

        try:
            contract_address, contract_abi = generate_and_deploy_solidity_code(
                token_name=name,
                token_symbol=symbol,
                decimals=decimals,
                initial_supply=initial_supply,
                burnable=burnable,
            )

            token = Token.objects.create(
                name=name,
                symbol=symbol,
                decimals=decimals,
                mintable=mintable,
                burnable=burnable,
                transferable=transferable,
                address=contract_address,
                abi=contract_abi,
                network=Network.objects.first()
            )

            return Response(status=201, data={'token_id': token.id, 'contract_address': contract_address})

        except Exception as e:
            return Response(status=500, data={'error': str(e)})