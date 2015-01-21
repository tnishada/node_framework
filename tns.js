var app = this;

var router = require('./router.js').router;
var http = require('http');
var http_IP = '127.0.0.1';

//var routes = {}; // array used to store url and callback function

var server = http.createServer(function (req, res) {
    router.route(req,res);
});

app.get = function(urlComponent , callback){
    router.routesArray[urlComponent] = callback;
};

app.listen = function(port , callback){

    server.listen(port,http_IP);
    callback();
};

module.exports.app = app;





