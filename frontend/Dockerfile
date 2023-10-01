# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY ./frontend/package*.json /app/

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY ./frontend /app/

# Build the React app
RUN npm run build

# Expose the port that the React app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]