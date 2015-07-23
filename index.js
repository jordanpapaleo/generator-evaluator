#! /usr/bin/env node

var http    = require('http');
var nodemon = require('nodemon');
var args    = require('minimist')(process.argv.slice(2), {
    number: 'i'
});

nodemon({
    script: './src/api.js'
});

nodemon.on('start', function() {
    setTimeout(function() {
        var i = (args.i) ? args.i : 10;

        while (i) {
            generateEquation();
            generateEquation();
            i--;
        }
    }, 250);
});

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
            evaluateEquation(chunk);
        });
    });

    req.on('error', function(e) {
        console.log('Generator API error: ' + e.message);
    });
    req.end();
}

function evaluateEquation(data) {
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
            'Content-Type': 'application/x-www-form-urlencoded'
            //'Content-Length': data.expression.length
        }
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Done');
            console.log('');
        });
    });

    req.on('error', function(e) {
        console.log('Evaluator API error: ' + e.message);
    });

    var encodedString = encodeString(data.expression);

    req.write(encodedString);
    req.end();
}

function encodeString(string) {
    return string.replace(/\+/g, '%2B');
}
