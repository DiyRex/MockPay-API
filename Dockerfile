FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8083

ENV NODE_ENV=production

CMD ["npm", "start"]
