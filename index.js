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
            generateEquation('A:' + i, i);
            generateEquation('B:' + i, i);
            i--;
        }
    }, 250);
});

function generateEquation(id, i) {
    console.log('id',id);

    var options = {
        hostname: '127.0.0.1',
        port: 1337,
        path: '/v1/generator',
        method: 'GET'
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            evaluateEquation(id, chunk);
        });
    });

    req.on('error', function(e) {
        console.log('Generator API error: ' + e.message);
    });
    req.end();
}

function evaluateEquation(id, data) {
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
            console.log('');
            console.log(id);
            console.log('--------');
            console.log('Equation:', data.expression);
            console.log('Value:',chunk);
        });
    });

    req.on('error', function(e) {
        console.log('Evaluator API error: ' + e.message);
    });

    req.write(data.expression);
    req.end();
}
