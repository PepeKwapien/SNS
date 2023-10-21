FROM node:18-alpine

WORKDIR /app

COPY SimpleBack/package.json ./

RUN npm install

COPY SimpleBack/ ./

EXPOSE 3000

CMD [ "node", "index.js" ]