# Base image
FROM node:18

# App directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .

# Expose port
EXPOSE 5001

CMD ["npm", "run", "start"]
 
 
