FROM node:19-alpine
WORKDIR /api

COPY package*.json ./

RUN npm install && chown -R root:root /api/node_modules

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]