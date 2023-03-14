FROM node:16

WORKDIR /server

COPY . .

COPY package*.json ./

RUN npm install -f 

EXPOSE 5000

CMD [ "npm", "start" ]
