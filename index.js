'use strict';

var HttpHashRouter = require('./lib/router');
var HttpHashServer = require('./lib/server.js');

module.exports = createServer;

function createServer(opts) {
    var routerOpts = new RouterOptions(opts);
    var router = new HttpHashRouter(routerOpts);

    var serverOpts = new ServerOptions(opts, router);
    var server = new HttpHashServer(serverOpts);

    return server;
}

function RouterOptions(opts) {
    this.services = opts.services;
    this.urlNotFound = opts.urlNotFound || null;
    this.methodNotAllowed = opts.methodNotAllowed || null;
}

function ServerOptions(opts, router) {
    this.hostname = opts.hostname;
    this.port = opts.port;
    this.router = router;
    this.globalRequestOptions = opts.globalRequestOptions;
}
