FROM node:lts-alpine
WORKDIR /app
 
### install and cache app dependencies
 
# copy package.json & package-lock.json to ./ inside the Docker image
COPY package*.json ./
 
# install dependencies of the app
RUN npm install
 
# copy the source code to the Docker image
COPY . .
 
# expose the port where the app will listen to
EXPOSE 3000
ENTRYPOINT ["npm", "start"]