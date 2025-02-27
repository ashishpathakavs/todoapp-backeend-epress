# Use an office node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

#Copy the package and package.lock files to container
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

#Define the command to run the application
CMD ["node", "./src/server.js"]