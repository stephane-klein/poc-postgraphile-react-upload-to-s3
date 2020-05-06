const fs = require("fs");
const { join } = require('path');
const { readFile } = require('fs');
const { promisify } = require('util');
const { v4: uuidv4 } = require('uuid');
const Minio = require('minio');

const Koa = require('koa');
const mount = require('koa-mount');
const KoaS3ProxyServe = require('koa-s3-proxy');
const { postgraphile } = require('postgraphile');
const { makeAddInflectorsPlugin } = require('graphile-utils');
const { NodePlugin } = require('graphile-build');
const ConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector');
const PostGraphileUploadFieldPlugin = require("postgraphile-plugin-upload-field");
const { graphqlUploadKoa } = require('graphql-upload');
const _ = require('koa-route');
const cors = require('@koa/cors');
const koaBody = require('koa-body');

const config = require('./config.js');

const app = new Koa();

Minio.Client.prototype.putObject = promisify(Minio.Client.prototype.putObject);

if (config.get('enableCors')) {
    app.use(cors());
}

var minioClient;

if (config.get('s3Attachments.enable')) {
    minioClient = new Minio.Client({
        endPoint: config.get('s3Attachments.endPoint'),
        port: config.get('s3Attachments.port'),
        useSSL: config.get('s3Attachments.useSSL'),
        accessKey: config.get('s3Attachments.accessKey'),
        secretKey: config.get('s3Attachments.secretKey')
    });

    app.use(
        mount(
            '/attachments/',
            KoaS3ProxyServe({
                endPoint: config.get('s3Attachments.endPoint'),
                port: config.get('s3Attachments.port'),
                useSSL: config.get('s3Attachments.useSSL'),
                accessKey: config.get('s3Attachments.accessKey'),
                secretKey: config.get('s3Attachments.secretKey'),
                bucketName: config.get('s3Attachments.bucketName')
            })
        )
    );
}

app.use(koaBody());

async function resolveUpload(upload) {
    var { filename, createReadStream } = upload;
    const stream = createReadStream();
    filename = `${uuidv4()}/${filename}`;
    try {
        await minioClient.putObject(
            'attachments',
            filename,
            stream
        );
    } catch (e) {
        console.log(e);
    }
    return filename;
}


// More information about this code, see « Is there a way to disable introspection? » (https://github.com/graphile/postgraphile/issues/971)
app.use(async(ctx, next) => {
    if (config.get('introspectionSchemaSecurity') === false) {
        await next();
        return;
    }

    if (ctx.req &&
        ctx.request.body &&
        ctx.request.body.query &&
        !ctx.request.body.query.includes('__schema', 0)
    ) {
        await next();
    } else if (
        config.get('introspectionSchemaSecret') === ctx.request.get('Introspection-secret') &&
        ctx.req.method === 'POST'
    ) {
        await next();
    } else {
        ctx.throw(401, 'Unauthorized');
    }
});

app.use(graphqlUploadKoa());

// Postgraphile middleware
app.use(
    postgraphile(
        config.get('connection'),
        config.get('schemas'),
        Object.assign(config.get('postgraphile'), {
            skipPlugins: [
                // Disable because there are same table name between different schema
                // https://www.graphile.org/postgraphile/node-id/
                NodePlugin
            ],
            appendPlugins: [
                ConnectionFilterPlugin,
                PgSimplifyInflectorPlugin,
                makeAddInflectorsPlugin(
                    {
                        constantCase: (str) => {
                            return str
                                .replace(/[^a-zA-Z0-9_|]+/g, '_')
                                .replace(/[A-Z]+/g, '_$&')
                                .replace(/__+/g, '_')
                                .replace(/\|+/g, '_')
                                .replace(/^[^a-zA-Z0-9]+/, '')
                                .replace(/^[0-9]/, '_$&') // GraphQL enums must not start with a number
                                .toUpperCase();
                        }
                    },
                    true
                ),
                PostGraphileUploadFieldPlugin
            ],
            enableCors: false,
            allowExplain: () => config.get('allowExplain'),
            graphileBuildOptions: {
                uploadFieldDefinitions: [
                    {
                        match: ({ column }) => {
                            return column.endsWith("_file");
                        },
                        resolve: resolveUpload
                    }
                ]
            }
        })
    )
);

app.listen(config.get('port'), config.get('host'), () => {
    console.log(`GraphQL API listen on http://${config.get('host')}:${config.get('port')}`);
});
