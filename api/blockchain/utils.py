from blockchain.models import Token, Transaction
from web3 import Web3
from core.settings import OWNER_PRIVATE_KEY, DEFAULT_RPC_URL
from jinja2 import Template
from solcx import compile_source, install_solc
import os, json
from typing import Tuple, Any, Optional
import requests
import pydid

def initialize_web3(token_id: int) -> Tuple[Web3, Any]:
    try:
        token = Token.objects.get(id=token_id)
        network = token.network
        rpc_url = network.rpc_url
        contract_address = token.address
        contract_abi = token.abi
    except Token.DoesNotExist:
        raise ValueError(f"Token with id {token_id} does not exist")

    w3 = Web3(Web3.HTTPProvider(rpc_url))
    contract = w3.eth.contract(address=w3.to_checksum_address(contract_address), abi=contract_abi)
    return w3, contract

def get_user_balance(token_id: int, user_blockchain_address: str) -> int:
    w3, contract = initialize_web3(token_id)
    balance = contract.functions.balanceOf(user_blockchain_address).call()
    return balance

def mint_token_to_user(token_id: int, amount: int = 10 ** 18, customer: Optional[Any] = None) -> Any:
    try:
        token = Token.objects.get(id=token_id)
        network = token.network
        chain_id = network.chain_id
    except Token.DoesNotExist:
        raise ValueError(f"Token with id {token_id} does not exist")

    w3, contract = initialize_web3(token_id)
    owner_blockchain_address = w3.eth.account.from_key(OWNER_PRIVATE_KEY).address
    nonce = w3.eth.get_transaction_count(w3.to_checksum_address(owner_blockchain_address))

    if customer is not None:
        user_blockchain_address = customer.blockchain_address

    tx = contract.functions.mint(w3.to_checksum_address(user_blockchain_address), amount).build_transaction({
        'chainId': int(chain_id),
        'gas': 100000,
        'gasPrice': w3.eth.gas_price,
        'nonce': nonce,
    })

    signed_tx = w3.eth.account.sign_transaction(tx, private_key=OWNER_PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    try:
        from app.models import CustomerProfile
        customer = CustomerProfile.objects.get(blockchain_address=user_blockchain_address)
    except CustomerProfile.DoesNotExist:
        customer = None

    Transaction.objects.create(
        tx_hash=tx_hash.hex(),
        from_address=owner_blockchain_address,
        to_address=user_blockchain_address,
        value=amount,
        gas_price=tx_receipt.gasUsed * tx_receipt.effectiveGasPrice,
        gas_used=tx_receipt.gasUsed,
        status=tx_receipt.status,
        token=token,
        customer=customer,
        data=f"Received {token.name} token"
    )

    return tx_receipt


def generate_and_deploy_solidity_code(token_name: str, token_symbol: str, decimals: int, initial_supply: int, burnable: bool) -> Tuple[str, str]:
    # Sanitize token_name for use as a contract name (remove spaces)
    contract_name = token_name.replace(" ", "_")
    
    template = Template('''
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
    {% if burnable %}
    import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
    {% endif %}
    import "@openzeppelin/contracts/access/Ownable.sol";

    contract {{ contract_name }} is ERC20{% if burnable %}, ERC20Burnable{% endif %}, Ownable {
        constructor(address initialOwner)
            ERC20("{{ token_name }}", "{{ token_symbol }}")
            Ownable(initialOwner)
        {
            _mint(initialOwner, {{ initial_supply }} * (10 ** uint256(decimals())));
        }

        function mint(address to, uint256 amount) public onlyOwner {
            _mint(to, amount);
        }
    }
    ''')

    solidity_code = template.render(
        token_name=token_name,
        token_symbol=token_symbol,
        contract_name=contract_name,
        decimals=decimals,
        initial_supply=initial_supply,
        burnable=burnable
    )

    output_dir = os.path.dirname(os.path.abspath(__file__))
    output_file = os.path.join(output_dir, f"{contract_name}.sol")
    
    try:
        with open(output_file, 'w') as file:
            file.write(solidity_code)
        print(f"Solidity contract '{output_file}' generated successfully.")

 
        install_solc('0.8.20')
        
        import subprocess
        
        try:
            subprocess.run(["solc-select", "use", "0.8.20"], check=True)
            os.environ["SOLC_VERSION"] = "0.8.20"
        except subprocess.CalledProcessError:
            print("Warning: Failed to set solc version with solc-select. Continuing with py-solc-x...")

        compiled_sol = compile_source(
            solidity_code,
            output_values=['abi', 'bin'],
            base_path=output_dir,
            allow_paths=output_dir,
            import_remappings=['@openzeppelin=node_modules/@openzeppelin']
        )

        w3 = Web3(Web3.HTTPProvider(DEFAULT_RPC_URL))

        contract_abi = json.dumps(compiled_sol['<stdin>:' + contract_name]['abi'])
        contract_bytecode = compiled_sol['<stdin>:' + contract_name]['bin']

        owner_account = w3.eth.account.from_key(OWNER_PRIVATE_KEY)
        nonce = w3.eth.get_transaction_count(owner_account.address)

        contract = w3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)
        tx = contract.constructor(owner_account.address).build_transaction({
            'chainId': w3.eth.chain_id,
            'gas': 2000000,
            'gasPrice': w3.eth.gas_price,
            'nonce': nonce,
        })

        signed_tx = w3.eth.account.sign_transaction(tx, private_key=OWNER_PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        print(f"Contract deployed at address: {tx_receipt.contractAddress}")

    finally:
        if os.path.exists(output_file):
            os.remove(output_file)

    return tx_receipt.contractAddress, contract_abi

def generate_blockchain_keys() -> Tuple[str, str, str]:
    w3 = Web3(Web3.HTTPProvider(DEFAULT_RPC_URL))

    w3.eth.account.enable_unaudited_hdwallet_features()
    account, mnemonic = w3.eth.account.create_with_mnemonic()

    private_key = account.key.hex()
    public_key = account.address

    return mnemonic, private_key, public_key

def validate_did(did: str) -> bool:
    try:
        response = requests.get(f'https://didlint.ownyourdata.eu/api/validate/{did}')
        external_validation = response.json().get('valid', False)
    except Exception:
        external_validation = False
    
    try:
        did_obj = pydid.DID(did)
        pydid_validation = True
    except Exception as e:
        print(f"Error validating DID with pydid: {e}")
        pydid_validation = False

    try:
        resolver_url = f"https://dev.uniresolver.io/1.0/identifiers/{did}"
        headers = {"Accept": "application/did+json"}
        resolver_response = requests.get(resolver_url, headers=headers, timeout=5)
        
        if resolver_response.status_code == 200:
            try:
                did_doc = resolver_response.json()
                network_validation = "@context" in did_doc or "id" in did_doc
            except ValueError:
                network_validation = False
        else:
            network_validation = False
    except Exception as e:
        print(f"Error resolving DID over network: {e}")
        network_validation = False

    # DID is valid if syntactically correct AND either externally validated or resolvable
    return pydid_validation and (external_validation or network_validation)