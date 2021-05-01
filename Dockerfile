FROM node:14.16-stretch-slim AS build

WORKDIR /app

COPY package.json package-lock.json /app/

RUN echo '{ "allow_root": true }' > /app/.bowerrc
RUN npm install --production && \
    npm install --only=dev && \
    rm -f .npmrc

COPY . /app

RUN npm run build
RUN npm prune --production

FROM node:14.16-stretch-slim

WORKDIR /app

COPY --from=build /app /app

CMD ["npm", "run", "start"]

USER node