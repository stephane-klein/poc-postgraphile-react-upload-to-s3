# Dummy Contact application based on Postgraphile + ReactJS 

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