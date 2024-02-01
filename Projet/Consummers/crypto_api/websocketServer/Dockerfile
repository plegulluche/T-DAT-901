FROM node:19-alpine

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "npm", "start", "app.js" ]