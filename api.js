var Generator  = require('./src/Generator');
var Evaluator  = require('./src/Evaluator');

var http       = require('http');
var connect    = require('connect');
var request    = require('request');
var bodyParser = require('body-parser');
var send       = require('connect-send-json');

var app  = connect();
var port = 1337;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(send.json());

app.use('/v1/evaluator/', function(req, res) {
    var response;

    switch(req.method) {
        case 'POST':
            for(var key in req.body) {
                var value = Evaluator.solve(key);
                response = value.toString();
            }
            break;
        case 'GET':
            response = "GET";
            break;
        case 'PUT':
            response = "PUT";
            break;
        default:
            response = "DEFAULT";
    }

    res.end(response);
});

app.use('/v1/generator/', function(req, res) {
    switch(req.method) {
        case 'POST':
            break;
        case 'GET':
            res.json({
                expression: Generator.createExpression(Math.ceil(Math.random() * 50))
            });
            break;
        case 'PUT':
            break;
        default:
    }

    res.end();
});

// respond to all requests
app.use('/', function(req, res){
    res.end('Generator Evaluator Service\n');
});

var api = http.createServer(app).listen(port);


