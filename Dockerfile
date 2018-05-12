FROM node:8-alpine

WORKDIR /opt/app
COPY . /opt/app

RUN npm i
RUN npm i -g forever

ENTRYPOINT sh /opt/app/app.sh
