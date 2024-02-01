FROM node:19

WORKDIR /api

COPY package*.json ./

RUN npm install && chown -R root:root /api/node_modules

COPY . .

EXPOSE 8081

CMD [ "npm" , "start" , "app.js" ]