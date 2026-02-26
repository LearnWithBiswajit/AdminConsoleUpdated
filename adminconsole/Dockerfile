# Step 1: Build the React app
FROM node:22-alpine AS build

ARG REACT_APP_API_BASE_URL

# Set environment variable so CRA picks it up
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --force

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# # Step 2: Serve the build using a lightweight web server (Nginx)
# FROM nginx:stable-alpine

# # Copy build files to Nginx's web directory
# COPY --from=build /app/build /usr/share/nginx/html

# # Optional: Remove default nginx config and copy a custom one if needed
# # COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port 80
# EXPOSE 8080

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

# Step 2: Serve using 'serve'
FROM node:18-alpine

# Install 'serve' globally
RUN npm install -g serve

# Copy build files from previous stage
COPY --from=build /app/build /app/build

WORKDIR /app/build

# Expose port (serve defaults to 3000)
EXPOSE 3003

CMD ["serve", "-s", ".", "-l", "3003"]
