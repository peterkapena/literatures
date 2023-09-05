FROM arm64v8/node:alpine

# Create app directory
WORKDIR /app

# First, copy the package files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install 'forever' globally
# RUN npm install forever -g

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

# Set the environment variable for production
ENV NODE_ENV production

# Build the Next.js app for production
RUN npm run build
RUN apk add nano
RUN touch .env.production
# Expose the port your app will run on
EXPOSE 3000

# Use 'forever' to run your Next.js app with the specified options
CMD ["npm", "start", "--", "-p", "3000"]


#                           docker build -t grower_management .
#                           docker run -dp 4000:4000 grower_management (optional)
#                           docker tag grower_management  kapenapeter/grower_management
#                           docker push kapenapeter/grower_management

#                           sudo docker pull kapenapeter/grower_management
#                           sudo docker run -dp 4000:4000 kapenapeter/grower_management   