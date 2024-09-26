# Use the official Node.js image as the base image
FROM node:19.8.1 as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a smaller image to serve the built app
FROM nginx:stable-alpine as production-stage

# Copy the build output to the Nginx HTML directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
