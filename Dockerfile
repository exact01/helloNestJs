FROM node:18-alpine as builder
WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "./dist/src/main.js"]