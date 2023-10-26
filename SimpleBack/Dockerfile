FROM node:18-alpine as build

WORKDIR /app

COPY SimpleBack/package*.json ./

RUN npm ci

COPY SimpleBack/ ./

RUN npx tsc

FROM node:18-alpine as release

WORKDIR /app

COPY --from=build /app/package*.json .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist/ .

EXPOSE 3000

CMD [ "node", "index.js" ]