FROM node:12 AS builder

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN npm i && npm run build

FROM nginx:stable

COPY --from=builder /app/dist /usr/share/nginx/html
