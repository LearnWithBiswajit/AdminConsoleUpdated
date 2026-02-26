FROM node:22-alpine

#Create all dictionary
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Export port
EXPOSE 3000

# Execute command to start server
CMD ["node", "dist/main.js"]