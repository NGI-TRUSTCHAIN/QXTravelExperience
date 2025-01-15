# QX Core API

## ✨ Manual build

### **Start the Core API** 
<br />

> 👉 **Step #0** -  Start local Docker Postgres DB

```bash
docker run --name qx -e POSTGRES_PASSWORD=qx_password -e POSTGRES_USER=qx_user -p 5432:5432 -d postgis/postgis
```

<br />

> 👉 **Step #2** - Create a virtual environment

```bash
$ python -m venv .venv
$ source env/bin/activate
```
<br />

> 👉 **Step #3** - Install dependencies using PIP

```bash
$ pip install -r requirements.txt
```

<br />

> 👉 **Step #4** - Create a new `.env` file using sample `env.sample`

> 👉 **Step #5** - Start the API server

```bash
$ python manage.py migrate
$ python manage.py runserver 5000
```

The API server will start using the explicit port `5000`.

Now, the API will start on port `5000`. 