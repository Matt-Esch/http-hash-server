'use strict';

var assert = require('assert');

var createServer = require('../');

var HEALTH_STATUS_CODE = 200;
var HEALTH_RESPONSE_BODY = new Buffer('{"message":"OK"}');
var HEALTH_HEADERS = {
    'content-length': HEALTH_RESPONSE_BODY.length,
    'content-type': 'application/json',
    'connection': 'keep-alive'
};
var server = createServer({
    hostname: '127.0.0.1',
    port: 9000,
    services: {
        example: {
            route: '/health',
            methods: {
                buzzer: {
                    httpMethod: 'GET',
                    route: '/',
                    handler: function handleRequest(req, res, opts) {
                        res.writeHead(HEALTH_STATUS_CODE, HEALTH_HEADERS);
                        res.end(HEALTH_RESPONSE_BODY);
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
