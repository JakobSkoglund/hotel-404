# Use Node.js base image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose the service port
EXPOSE 7701

# Start the service
CMD ["npm", "start"]
