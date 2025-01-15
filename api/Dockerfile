FROM python:3.13

WORKDIR /django-api

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DEBUG=False

# Update and install nodejs and npm
RUN apt-get update && apt-get install -y \
    libproj-dev \
    binutils \
    gdal-bin \
    nodejs \
    npm

# Copy the requirements file and install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files into the container
COPY . .

# Set the working directory
WORKDIR /django-api/blockchain

# Install npm dependencies
RUN npm install

# Install solidity compiler
RUN solc-select install 0.8.20 && solc-select use 0.8.20

# Expose the desired port
EXPOSE 5005

WORKDIR /django-api

# Collect static files
RUN python manage.py collectstatic --clear --noinput

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:5005", "core.wsgi:application"]
