# Dummy Contact application based on Postgraphile + ReactJS with GraphQL file upload support

GraphQL file upload is based on:

- Backend: [`graphile-contrib/postgraphile-plugin-upload-field`](https://github.com/graphile-contrib/postgraphile-plugin-upload-field)
- Frontend: [`jaydenseric/apollo-upload-client`](https://github.com/jaydenseric/apollo-upload-client)

Attachments files are stored in [Minio](https://min.io/) Object Storage server (compatible with [S3](https://en.wikipedia.org/wiki/Amazon_S3) API).

## Prerequisites

- [Docker Engine](https://docs.docker.com/engine/) (version `18.06.1-ce`)
- [Docker Compose](https://docs.docker.com/compose/) (version `1.22.0`)
- [nodejs](https://nodejs.org/en/) (version `v12.10.0`)

[Homebrew](https://brew.sh/index_fr) instructions:

```sh
$ brew cask install docker
$ brew install git node yarn
```

## Getting started

Git clone this project a working directory, next:

```
$ docker-compose up -d postgres
$ ./scripts/load-seed.sh
$ ./scripts/load-fixtures.sh
$ docker-compose up -d
```

You can browse in database with [graphiql](https://github.com/graphql/graphiql) on this page: http://127.0.0.1:5000/graphiql

Now that the backend has been started, go to [`frontend/`](frontend/) to start the « Contact Web Frontend ».

## Postgraphile custom image

This project use `stephaneklein/poc-postgraphile-react-upload-to-s3` Docker Image, it is [Postgraphile](https://www.graphile.org/postgraphile/) with some custom configuration and plugins.

Go to [`postgraphile/`](postgraphile/) to rebuild and update this Docker Image.
