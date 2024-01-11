# Use an official Node.js runtime as a base image
FROM node:20.10.0 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files
COPY . .

# Build the app
RUN npm run build

# Use the serve package to serve the static files
FROM node:20.10.0
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]