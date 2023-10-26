FROM node:18-alpine AS build

WORKDIR /app

COPY SimpleFront/package*.json ./

RUN npm install

COPY SimpleFront/ ./

RUN npm run build

FROM nginx:1.25.3-alpine

COPY --from=build /app/dist/simple-front/ /usr/share/nginx/html

EXPOSE 80