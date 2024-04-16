FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

ENV PORT=3000
ENV DB_NAME='users'
EXPOSE 3000

CMD [ "npm", "run", "start" ]