FROM node:lts-alpine
COPY . /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3450
ENTRYPOINT ["npm", "start"]