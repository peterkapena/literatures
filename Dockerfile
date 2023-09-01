# Use an official Node.js runtime as a parent image
FROM node:14

# Create app directory
WORKDIR /app

# First, copy the package files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install 'forever' globally
RUN npm install forever -g

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

# Set the environment variable for production
ENV NODE_ENV production

# Build the Next.js app for production
RUN npm run build

# Expose the port your app will run on
EXPOSE 4000

# Use 'forever' to run your Next.js app with the specified options
CMD ["npm start"]

#                           docker run -dp 4000:4000 grower_management (optional)
#                           docker tag grower_management  kapenapeter/grower_management
#                           docker push kapenapeter/grower_management

#                           sudo docker pull kapenapeter/grower_management
#                           sudo docker run -dp 4000:4000 kapenapeter/grower_management   