# QX API Documentation

This document provides details on the available API endpoints for the QX Travel Experience application.

## Base URLs

The API uses base URLs defined in the Insomnia environment:
*   `{{url}}`: Base URL for HTTP requests (e.g., `http://localhost:5005`)

## Authentication

Most endpoints require authentication. Two types of tokens are used:
*   **Customer Token:** Obtained via Customer User Auth endpoints. Sent in the `Authorization` header as `Token {{customer_authorization_token}}`.
*   **Dashboard Token:** Obtained via Dashboard User Auth endpoints. Sent in the `authorization` header as `{{authorization_token}}`. (Note the lowercase 'a').

---

## Wallet APIs

Endpoints primarily used by the customer-facing wallet application.

### Customer User Auth

Handles authentication for customer users.

#### Send Code to Email
*   **Method:** `POST`
*   **URL:** `{{url}}/api/customer/auth/email/`
*   **Body:**
    ```json
    {
        "email": "customer@example.com"
    }
    ```
*   **Description:** Sends a login code to the specified customer email address.

#### Code + Email -> Login Token
*   **Method:** `POST`
*   **URL:** `{{url}}/api/customer/auth/token/`
*   **Body:**
    ```json
    {
        "token": "123456",
        "email": "customer@example.com"
    }
    ```
*   **Description:** Exchanges the received code and email for a customer login token (`customer_authorization_token`).

#### Verify Login Token
*   **Method:** `GET`
*   **URL:** `{{ _.url }}/api/customer/auth/checkSession`
*   **Headers:**
    *   `Authorization: Token {{ _.customer_authorization_token }}`
*   **Description:** Checks if the current customer login token is valid.

### Customer Info

Endpoints for managing customer profile information and blockchain details.

#### Get Customer Info
*   **Method:** `GET`
*   **URL:** `{{ _.url }}/api/user/info`
*   **Headers:**
    *   `Authorization: Token {{ _.customer_authorization_token }}`
*   **Description:** Retrieves the profile information for the authenticated customer.

#### Update Customer Info
*   **Method:** `POST`
*   **URL:** `{{ _.url }}/api/user/info-update`
*   **Headers:**
    *   `Authorization: Token {{ _.customer_authorization_token }}`
    *   `Content-Type: multipart/form-data`
*   **Body (form-data):**
    *   `profile_picture`: (file)
    *   `first_name`: `Jane`
    *   `last_name`: `Doe`
*   **Description:** Updates the customer's first name, last name, and profile picture.

#### Change Customer Email
*   **Method:** `POST`
*   **URL:** `{{ _.url }}/api/user/change-email`
*   **Headers:**
    *   `Authorization: Token {{ _.customer_authorization_token }}`
*   **Body:**
    ```json
    {
        "new_email": "new.customer@example.com"
    }
    ```
*   **Description:** Initiates the process to change the customer's email address.

#### Delete Account
*   **Method:** `POST`
*   **URL:** `{{ _.url }}/api/user/delete-account`
*   **Headers:**
    *   `Authorization: Token {{ _.customer_authorization_token }}`
*   **Description:** Deletes the authenticated customer's account.

#### Customer Logs
*   **Method:** `GET`
*   **URL:** `{{ _.url }}/api/user/logs`
*   **Headers:**
    *   `Authorization: Token {{ _.customer_authorization_token }}`
*   **Description:** Retrieves activity logs for the authenticated customer.

#### Blockchain Address
*   **Method:** `GET`
*   **URL:** `{{ _.url }}/api/blockchain/blockchain_address`
*   **Headers:**
    *   `Authorization: Token {{ _.customer_authorization_token }}`
*   **Description:** Retrieves the blockchain address associated with the customer's account.

#### Mnemonic
*   **Method:** `GET`
*   **URL:** `{{ _.url }}/api/blockchain/mnemonic`
*   **Headers:**
    *   `Authorization: Token {{ _.customer_authorization_token }}`
*   **Description:** Retrieves the mnemonic phrase for the customer's wallet (handle with extreme care).

#### Token Balance
*   **Method:** `GET`
*   **URL:** `{{url}}/api/blockchain/token_balance`
*   **Headers:**
    *   `Authorization: Token {{customer_authorization_token}}`
*   **Parameters:**
    *   `token_id`: (query) ID of the token.
*   **Description:** Gets the balance for a specific token for the customer.

#### Combined Token Balance
*   **Method:** `GET`
*   **URL:** `{{url}}/api/blockchain/token_balance_combined`
*   **Headers:**
    *   `Authorization: Token {{customer_authorization_token}}`
*   **Description:** Gets the combined balance of all relevant tokens for the customer.

#### Customer Transactions
*   **Method:** `GET`
*   **URL:** `{{url}}/api/blockchain/customer_transactions`
*   **Headers:**
    *   `Authorization: Token {{customer_authorization_token}}`
*   **Description:** Retrieves blockchain transaction history for the customer.

#### Receive Reward
*   **Method:** `POST`
*   **URL:** `{{url}}/api/blockchain/receive_reward`
*   **Headers:**
    *   `Authorization: Token {{customer_authorization_token}}`
*   **Body:**
    ```json
    {
        "token_id": 1
    }
    ```
*   **Description:** Claims a reward associated with a specific token ID.

#### DID
Endpoints for managing Decentralized Identifiers (DIDs) associated with the customer.

##### Get Customer DIDs
*   **Method:** `GET`
*   **URL:** `{{ _.url }}/api/blockchain/dids`
*   **Headers:**
    *   `Authorization: Token {{ _.customer_authorization_token }}`
*   **Description:** Retrieves all DIDs registered by the customer.

##### Add Customer DID
*   **Method:** `POST`
*   **URL:** `{{ _.url }}/api/blockchain/add_did`
*   **Headers:**
    *   `Authorization: Token {{ _.customer_authorization_token }}`
*   **Body:**
    ```json
    {
        "name": "My Primary DID",
        "did": "did:example:123456789abcdefghi"
    }
    ```
*   **Description:** Adds a new DID for the customer.

## Dashboard APIs

Endpoints primarily used by the administrative dashboard application. Require a dashboard user `authorization_token`.

### Dashboard User Auth

Handles authentication for dashboard users.

#### Register
*   **Method:** `POST`
*   **URL:** `{{url}}/api/users/register`
*   **Body:**
    ```json
    {
        "password": "aSecurePassword123!",
        "email": "admin@example.com"
    }
    ```
*   **Description:** Registers a new dashboard user.

#### Login
*   **Method:** `POST`
*   **URL:** `{{url}}/api/users/login`
*   **Body:**
    ```json
    {
        "password": "aSecurePassword123!",
        "email": "admin@example.com"
    }
    ```
*   **Description:** Logs in a dashboard user and returns an `authorization_token`.

#### Check Session
*   **Method:** `POST`
*   **URL:** `{{url}}/api/users/checkSession`
*   **Headers:**
    *   `authorization: {{authorization_token}}`
*   **Description:** Checks if the current dashboard user session token is valid.

#### Logout
*   **Method:** `POST`
*   **URL:** `{{url}}/api/users/logout`
*   **Headers:**
    *   `authorization: {{authorization_token}}`
*   **Description:** Logs out the current dashboard user.

#### Edit User
*   **Method:** `POST`
*   **URL:** `{{url}}/api/users/edit`
*   **Headers:**
    *   `authorization: {{authorization_token}}`
*   **Body:**
    ```json
    {
        "userID": 5,
        "email": "updated.admin@example.com"
    }
    ```
*   **Description:** Edits details of a dashboard user (likely requires admin privileges).

### Customer CRM

Endpoints for managing customer data from the dashboard perspective.

#### List All Customers
*   **Method:** `GET`
*   **URL:** `{{url}}/api/crm`
*   **Headers:**
    *   `authorization: {{authorization_token}}`
*   **Description:** Retrieves a list of all customers (likely within the user's organization).

#### Get Customer
*   **Method:** `GET`
*   **URL:** `{{url}}/api/crm/{customer_id}` (Example: `/api/crm/1`)
*   **Headers:**
    *   `authorization: {{authorization_token}}`
*   **Description:** Retrieves details for a specific customer.

#### Create Customer
*   **Method:** `POST`
*   **URL:** `{{url}}/api/crm`
*   **Headers:**
    *   `authorization: {{authorization_token}}`
*   **Body:**
    ```json
    {
        "user_id": 15,
        "email": "john.doe@email.com",
        "first_name": "John",
        "last_name": "Doe",
        "phone_number": "+1-555-123-4567",
        "anonymous": false,
        "blockchain_address": "0x123abc456def789..."
    }
    ```
*   **Description:** Creates a new customer record in the CRM.

#### Update Customer
*   **Method:** `PUT`
*   **URL:** `{{url}}/api/crm/{customer_id}` (Example: `/api/crm/1`)
*   **Headers:**
    *   `authorization: {{authorization_token}}`
*   **Body:**
    ```json
    {
        "email": "<placeholder_email>",
        "first_name": "<placeholder_first_name>",
        "last_name": "<placeholder_last_name>",
        "phone_number": "<placeholder_phone>",
        "anonymous": false,
        "blockchain_address": "<placeholder_address>",
        "userID": 2 
    }
    ```
*   **Description:** Updates all details for a specific customer CRM record.

#### Delete Customer
*   **Method:** `DELETE`
*   **URL:** `{{url}}/api/crm/{customer_id}` (Example: `/api/crm/8`)
*   **Headers:**
    *   `authorization: {{authorization_token}}`
*   **Description:** Deletes a specific customer CRM record.

### Web3 (Blockchain Management)

Endpoints for managing blockchain-related settings like tokens and networks.

#### All Networks
*   **Method:** `GET`
*   **URL:** `{{url}}/api/blockchain/networks`
*   **Headers:**
    *   `authorization: {{authorization_token}}`
*   **Description:** Retrieves configured blockchain networks.

#### All Tokens
*   **Method:** `GET`
*   **URL:** `{{url}}/api/blockchain/tokens`
*   **Headers:**
    *   `authorization: {{authorization_token}}`
*   **Description:** Retrieves tokens created or managed by the organization.

#### Create Token
*   **Method:** `POST`
*   **URL:** `{{url}}/api/blockchain/create_token`
*   **Headers:**
    *   `authorization: {{authorization_token}}`
*   **Body:**
    ```json
    {
        "name": "Quantum Loyalty Point",
        "symbol": "QLP"
    }
    ```
*   **Description:** Creates a new custom token on the blockchain (requires appropriate setup).

#### All Transactions (Organization View)
*   **Method:** `GET`
*   **URL:** `{{url}}/api/blockchain/transactions`
*   **Headers:**
    *   `authorization: {{authorization_token}}`
*   **Parameters:**
    *   `token_id`: (Query, Required) Filter transactions by token ID.
*   **Description:** Retrieves all blockchain transactions related to a specific token managed by the organization.
