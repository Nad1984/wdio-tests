# Use official Node.js image
FROM node:20

# Set working directory inside container
WORKDIR /usr/src/app

# Copy project files into the container
COPY . .

# Install dependencies
RUN npm ci

# Default command to run tests
CMD ["npm", "run", "test"]

