FROM node:18-alpine

WORKDIR /app

COPY SimpleListener/package.json ./

RUN npm install

COPY SimpleListener/ ./

EXPOSE 3001

CMD [ "node", "index.js" ]