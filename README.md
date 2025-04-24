# QX Travel Experience

This project consists of a backend API, a user wallet interface, and an administrative dashboard.

## Prerequisites

*   Docker: [Install Docker](https://docs.docker.com/get-docker/)
*   Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/) (Usually included with Docker Desktop)

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/NGI-TRUSTCHAIN/QXTravelExperience
    cd QXTravelExperience
    ```

2.  **Configure the API Environment:**
    Copy the example environment file for the API service:
    ```bash
    cp api/env.sample api/.env
    ```
    Review and update the variables in `api/.env` if necessary.

## Running the Application

1.  **Build and start the services:**
    From the root directory (`QXTravelExperience`), run:
    ```bash
    docker compose up --build -d
    ```
    This command builds the images for the `api`, `dashboard`, and `wallet` services and starts all services (`db`, `api`, `dashboard`, `wallet`) in detached mode.

2.  **Access the applications:**
    *   **API:** Typically accessed by the frontends, but might be available for direct interaction depending on its configuration (check `api` documentation). Listens on port `5005` on the host.
    *   **Dashboard:** Open your web browser to [http://localhost:8080](http://localhost:8080)
    *   **Wallet:** Open your web browser to [http://localhost:8081](http://localhost:8081)

## Database Setup and Admin Access

1.  **Apply Database Migrations:**
    After starting the services for the first time, you need to run migrations to set up the database schema:
    ```bash
    docker compose exec api python manage.py migrate
    ```

2.  **Create a Superuser:**
    To access the Django admin interface, create a superuser:
    ```bash
    docker compose exec api python manage.py createsuperuser
    ```
    Follow the prompts to set username, email, and password for the admin user.

3.  **Access the Admin Interface:**
    Once the services are running, you can access the Django admin interface at:
    ```
    http://localhost:5005/admin
    ```
    Log in with the superuser credentials created in the previous step.

## Stopping the Application

To stop the running services:
```bash
docker compose down
```

## Services

*   `db`: PostgreSQL database with PostGIS extension. Data is persisted in a Docker volume named `postgres_data`.
*   `api`: The backend API service built from the `api/` directory. Depends on `db`. See [docs/api_documentation.md](docs/api_documentation.md) for detailed API documentation.
*   `dashboard`: Frontend application built from the `dashboard/` directory. Depends on `api`.
*   `wallet`: Frontend application built from the `wallet/` directory. Depends on `api`.

## Modularity and Independent Hosting

This project is designed with a modular architecture, separating the backend API from the frontend applications (Dashboard and Wallet). This separation offers flexibility:

*   **Independent Development & Scaling:** Each component (`api`, `dashboard`, `wallet`, `db`) can be developed, deployed, and scaled independently.
*   **Using the API:** The `api` service can be used standalone. You could build entirely different frontend applications or integrate its functionalities into other systems. To do this, ensure your client is configured to point to the API's URL (e.g., `http://<your-api-host>:5005`).
*   **Selective Hosting:** While the `dashboard` and `wallet` frontends depend on the `api`, you could choose to host only the components you need. For example, you might only deploy the `api` and `dashboard`.
*   **Configuration:** For independent hosting (outside the provided Docker Compose setup), ensure each service is configured correctly:
    *   The `api` service needs the correct database connection details (refer to `api/.env.sample`).
    *   The `dashboard` and `wallet` applications need to be configured (usually during their build process or via environment variables at runtime) with the correct URL of the `api` service they need to connect to.

## License

See the `LICENSE` file for details. 