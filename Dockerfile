FROM node:19-alpine

WORKDIR /opt/app
COPY . /opt/app

RUN npm i
RUN npm i -g ts-node

EXPOSE 3000/tcp
ENTRYPOINT sh /opt/app/app.sh
