# Postgraphile with some configuration and plugins

## Getting started

```
$ ../scripts/up-and-init-postgres.sh
$ (cd ..; docker-compose stop postgraphile)
$ (cd ..; docker-compose up -d s3)
```

```
$ yarn install
$ export GRAPHQL_API_S3_ATTACHMENTS_ENABLE=1
$ yarn run start:watch
```

http://127.0.0.1:5000/graphiql