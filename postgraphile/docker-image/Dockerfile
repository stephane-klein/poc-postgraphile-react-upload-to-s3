FROM node:12.10-alpine

RUN apk update -y && apk add git

WORKDIR app/

COPY src/ src/
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

EXPOSE 5000

CMD yarn run start
