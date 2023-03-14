FROM node:16

WORKDIR /client

COPY . . 

COPY package*.json ./

RUN npm install -f 

EXPOSE 3000

CMD ["npm", "start"]