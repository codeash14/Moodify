# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /webapp

# Copy the package.json and package-lock.json files into the container at /app
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /app
COPY . /webapp

# Make port 8888 available to the world outside this container
EXPOSE 8888

# Run the command to start the Node.js server
CMD ["node", "authorization_code/server.js"]
