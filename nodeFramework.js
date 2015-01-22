var app =  function(){};

var router = require('./router.js')();
var http = require('http');
var http_IP = '127.0.0.1';
var routeTypes = ['POST','GET','PUT','DELETE'];

var server = http.createServer(function (req, res) {
    router.route(req,res);
});

routeTypes.forEach(function(httpMethod){
    app.prototype[httpMethod.toLowerCase()] = function(urlComponent , callback){
        router.routesArray[httpMethod][urlComponent] = callback;
    };
});

app.prototype.listen = function(port , callback){

    server.listen(port,http_IP);
    callback();
};

module.exports = function(){
    return new app();
};
