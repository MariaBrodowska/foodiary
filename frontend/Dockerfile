FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 5173
EXPOSE 24678

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]