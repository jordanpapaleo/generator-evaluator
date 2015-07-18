var Generator = require('./src/Generator');
var Evaluator = require('./src/Evaluator');

var http       = require('http');
var connect    = require('connect');
var request    = require('request');
var bodyParser = require('body-parser');
var send       = require('connect-send-json');

/*----------------------------------------------*/
/*EVALUATOR SERVICE*/
/*----------------------------------------------*/
var app  = connect();
var port = 1337;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json({extended: true}));
app.use(send.json());

app.use('/v1/evaluator/', function(req, res, next) {
    switch(req.method) {
        case 'POST':
            var expression = '1-2*6*8*6*3-2';
            var value = Evaluator.solve(expression);
            res.end(value);
            break;
        case 'GET':
            res.end('GET');
            break;
        default:
            console.log('default');
    }
});

app.use('/v1/generator/', function(req, res, next) {
    console.log('req',req);

    switch(req.method) {
        case 'POST':

            break;
        case 'GET':
            res.statusCode = 200;
            res.json({
                expression: Generator.createExpression(Math.ceil(Math.random() * 50))
            });
            break;
        default:
            console.log('default');
    }

    res.end();
});

// respond to all requests
app.use('/', function(req, res){
    res.end('Generator Evaluator Service\n');
});

var api = http.createServer(app).listen(port);


