'use strict';

var http       = require('http');

var i = 1000;
while(i) {
    generateEquation();
    i--;
}

function generateEquation() {
    var options = {
        hostname: '127.0.0.1',
        port: 1337,
        path: '/v1/generator',
        method: 'GET'
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('');
            console.log('Equation:', JSON.parse(chunk).expression);
            evaluateEquation(chunk);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
}

function evaluateEquation(data) {
    /*
     POST /v1/evaluator HTTP/1.1
     Content-Type: application/x-www-form-urlencoded
     Host: 127.0.0.1:1337
     Connection: close
     User-Agent: Paw/2.2.2 (Macintosh; OS X/10.10.4) GCDHTTPRequest
     Content-Length: 49

     7-2*5-5*4*7/1*3-7/4*5-5*4*2/8*2/6*6/6/4-5*1-8*1*5
     */
    data = JSON.parse(data);

    if(!data.hasOwnProperty('expression')) {
        throw 'Expression not returned';
    }

    var options = {
        hostname: '127.0.0.1',
        port: 1337,
        path: '/v1/evaluator',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.expression.length
        }
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Evaluated',chunk);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(data.expression);
    req.end();
}
