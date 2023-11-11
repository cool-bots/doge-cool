FROM node:12-alpine
WORKDIR /opt/app
COPY ./ /opt/app/
RUN yarn && yarn build

FROM node:12-alpine
WORKDIR /opt/app
COPY --from=0 /opt/app/build /opt/app/
RUN yarn --production && yarn cache clean
CMD ["node", "index.js"]
