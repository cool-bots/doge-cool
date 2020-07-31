FROM node:8-alpine

WORKDIR /opt/app
COPY . /opt/app

RUN npm i

ENTRYPOINT npm start
