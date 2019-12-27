'use strict';
const priter= require('qtnode-middleware-console');
const path = require('path');

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();


module.exports = function (args) {
    let opts = Object.assign({}, args);
    // const packagejson = require(path.resolve(path.resolve(opts.rootDir, 'package.json')));
    const prodconfig = require(path.resolve(path.resolve(opts.rootDir, 'wpconf/dev.js')));
    const compiler = webpack(prodconfig);
    let entry = prodconfig.entry;

    for (let key in entry ) {
        entry[key] = ['webpack-hot-middleware/client?noInfo=true&reload=true', entry[key]];

    }
    prodconfig.entry = entry;
    return async function (next) {
        priter.info('start dev');

        app.use(webpackDevMiddleware(compiler, {
            publicPath: prodconfig.output.publicPath,
            info: false,
            noInfo: true
        }));

        app.use(webpackHotMiddleware(compiler, {
            log: priter.data, path: '/__webpack_hmr', heartbeat: 10 * 1000}));

        app.use(express.static(prodconfig.output.path));

        const server = app.listen( ()=> {
            priter.tip('==================================');
            priter.info(`devserver listening: http://localhost:${server.address()['port']}` );
            priter.tip('==================================');
        });

        next();

    };

};
