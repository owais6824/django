# Use Node.js image to build the React app
FROM node:23.10.0 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files from local to container
COPY . .

# Build the React project
RUN npm run build

# Use Nginx to serve the built frontend
FROM nginx:alpine

# Copy built files from previous step to Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for serving the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
