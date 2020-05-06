const Convict = require('convict');

const config = Convict({
    connection: {
        doc: 'Application string to connect to database',
        format: String,
        default: 'postgres://postgres:password@127.0.0.1:5432/postgres',
        env: 'GRAPHQL_API_DATABASE_STRING_URL'
    },
    host: {
        doc: 'Postgraphile listen address',
        format: String,
        default: '0.0.0.0',
        env: 'GRAPHQL_API_HOST'
    },
    port: {
        doc: 'Port used by postgraphile',
        format: Number,
        default: 5000,
        env: 'GRAPHQL_API_PORT'
    },
    schemas: {
        doc: 'Postgres schemas that will be used by postgraphile',
        format: Array,
        default: 'public',
        env: 'GRAPHQL_API_SCHEMAS'
    },
    introspectionSchemaSecurity: {
        doc: 'Enable security on introspection query',
        format: Boolean,
        default: false,
        env: 'GRAPHQL_API_ENABLE_INTROSPECTION_SCHEMA_SECURITY'
    },
    introspectionSchemaSecret: {
        doc: 'Secret used to use introspection query when instrospection security is on',
        format: String,
        default: undefined,
        env: 'GRAPHQL_API_INTROSPECTION_SCHEMA_SECRET'
    },
    enableCors: {
        doc: 'Boolean to enable/disable CORS',
        format: Boolean,
        default: true,
        env: 'GRAPHQL_API_ENABLE_CORS'
    },
    allowExplain: {
        doc: 'Boolean to enable/disable explain in Graphiql',
        format: Boolean,
        default: true,
        env: 'GRAPHQL_API_ENABLE_EXPLAIN'
    },
    postgraphile: {
        extendedErrors: {
            doc: 'Extends error output',
            format: Array,
            default: 'severity,code,detail,hint,position,internalPosition,internalQuery,where,schema,table,column,dataType,constraint,file,line,routine',
            env: 'GRAPHQL_API_EXTENDED_ERROR'
        },
        showErrorStack: {
            doc: 'Show postgraphile stack',
            format: Boolean,
            default: false,
            env: 'GRAPHQL_API_SHOW_ERROR_STACK'
        },
        jwtSecret: {
            doc: 'Used JWT secret',
            format: String,
            default: undefined,
            env: 'GRAPHQL_API_JWT_SECRET'
        },
        pgDefaultRole: {
            doc: 'Default role used with anonymous user',
            format: String,
            default: 'postgres',
            env: 'GRAPHQL_API_DEFAULT_ROLE'
        },
        jwtPgTypeIdentifier: {
            doc: 'Type of jwt token in postgraphile database',
            format: String,
            default: undefined,
            env: 'GRAPHQL_API_JWT_TOKEN_IDENTIFIER'
        },
        graphiql: {
            doc: 'Boolean to enable/disable graphiql',
            format: Boolean,
            default: true,
            env: 'GRAPHQL_API_ENABLE_GRAPHIQL'
        },
        enhanceGraphiql: {
            doc: 'Boolean to enable/disable graphiql enhancement',
            format: Boolean,
            default: true,
            env: 'GRAPHQL_API_ENABLE_GRAPHIQL_ENHANCEMENT'
        },
        watchPg: {
            doc: 'Boolean to watch database changes',
            format: Boolean,
            default: true,
            env: 'GRAPHQL_API_ENABLE_POSTGRES_WATCH'
        }
    },
    s3Attachments: {
        enable: {
            format: Boolean,
            default: false,
            env: 'GRAPHQL_API_S3_ATTACHMENTS_ENABLE'
        },
        endPoint: {
            format: String,
            default: '127.0.0.1',
            env: 'GRAPHQL_API_S3_ATTACHMENTS_ENDPOINT'
        },
        port: {
            format: Number,
            default: 9000,
            env: 'GRAPHQL_API_S3_ATTACHMENTS_PORT'
        },
        useSSL: {
            format: Boolean,
            default: false,
            env: 'GRAPHQL_API_S3_ATTACHMENTS_USESSL'
        },
        accessKey: {
            format: String,
            default: 'admin',
            env: 'GRAPHQL_API_S3_ATTACHMENTS_ACCESSKEY'
        },
        secretKey: {
            format: String,
            default: 'password',
            env: 'GRAPHQL_API_S3_ATTACHMENTS_SECRETKEY'
        },
        bucketName: {
            format: String,
            default: 'attachments',
            env: 'GRAPHQL_API_S3_ATTACHMENTS_BUCKETNAME'
        }
    }
});

config.validate({ allowed: 'strict' });

module.exports = config;
