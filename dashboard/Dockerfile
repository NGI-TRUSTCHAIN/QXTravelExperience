FROM node:lts-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Define build arguments for Vite environment variables
ARG VITE_PUBLIC_API_URL

# Set environment variables for Vite
ENV VITE_PUBLIC_API_URL=$VITE_PUBLIC_API_URL

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight nginx image to serve the built static files
FROM nginx:alpine

# Copy the built files from the previous stage to nginx's serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]