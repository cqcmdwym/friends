import express from 'express';
import graphqlHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import { schema } from './data/database';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// GraphQL server
const graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphQL server on localhost:${GRAPHQL_PORT}`));

// Relay
const compiler = webpack({
    entry: ['whatwg-fetch', path.resolve(__dirname, 'src', 'App.js')],
    modules: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /\.js$/,
            }
        ]
    },
    output: { filename: 'App.js', path: '/' }
})

const app = new WebPackDevServer(compiler, {
    contentBase: '/public/',
    proxy: {'/graphql': `http://localshot:${APP_PORT}`},
    publicPath: '/src/',
    stats: {colors: true},
});

app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => console.log(`App is now running on localhost:${APP_PORT}`));