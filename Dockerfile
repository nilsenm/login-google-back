FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Instala dependencias (incluye devDependencies para nodemon en desarrollo)
RUN npm ci

COPY . .

ENV NODE_ENV=development \
    CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true

EXPOSE 3000

CMD ["npm", "run", "start:dev"]


