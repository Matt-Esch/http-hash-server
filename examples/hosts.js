'use strict';

var assert = require('assert');
var Buffer = require('buffer').Buffer;

var createServer = require('../');

var HEALTH_STATUS_CODE = 200;
var HEALTH_RESPONSE_BODY = new Buffer('{"message":"OK"}');
var HEALTH_HEADERS = {
    'content-length': HEALTH_RESPONSE_BODY.length,
    'content-type': 'application/json',
    'connection': 'keep-alive'
};

var hosts = {}

var server = createServer({
    hostname: '0.0.0.0',
    port: 9000,
    services: {
        example: {
            route: '/ping',
            methods: {
                getHosts: {
                    httpMethod: 'GET',
                    route: '/',
                    handler: function handleRequest(req, res, opts) {
                        hosts[req.socket.remoteAddress] = true;
                        var body = new Buffer(
                            JSON.stringify(Object.keys(hosts))
                        );
                        res.statusCode = 200;
                        res.setHeader('content-type', 'application/json');
                        res.setHeader('content-length', String(body.length));
                        res.end(body);
                    }
                }
            }
        }
    },
    globalRequestOptions: {
        deps: {
            logger: console
        }
    }
});

server.listen(function onServerListen(err) {
    assert.ifError(err);
});
