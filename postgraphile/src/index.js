const { join } = require('path');
const { readFile } = require('fs');
const { promisify } = require('util');

const Koa = require('koa');
const { postgraphile } = require('postgraphile');
const { makeAddInflectorsPlugin } = require('graphile-utils');
const { NodePlugin } = require('graphile-build');
const ConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector');
const _ = require('koa-route');
const cors = require('@koa/cors');
const koaBody = require('koa-body');

const readFilePromise = promisify(readFile);
const config = require('./config.js');

const app = new Koa();

if (config.get('enableCors')) {
    app.use(cors());
}
app.use(koaBody());

// Route to get version
app.use(_.get('/version.json', async(ctx) => {
    try {
        ctx.body = await readFilePromise(join(__dirname, '/../tmp/version.json'));
        ctx.response.set('Content-Type', 'application/json');
    } catch (error) {
        console.error(error);
        ctx.throw(500, 'Internal server error');
    }
}));

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
                )
            ],
            enableCors: false,
            allowExplain: () => config.get('allowExplain')
        })
    )
);

app.listen(config.get('port'), config.get('host'), () => {
    console.log(`GraphQL API listen on http://${config.get('host')}:${config.get('port')}`);
});
