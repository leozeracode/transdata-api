FROM node:18

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; else npm install --force; fi

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]
