FROM node:14-alpine AS builder

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN npm i

CMD node src/backend/app.js
