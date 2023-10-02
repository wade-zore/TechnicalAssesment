# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY ./frontend /app/


# Expose the port that the React app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]