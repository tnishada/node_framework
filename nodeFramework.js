var app =  function(){};

var router = require('./router.js')();
var http = require('http');
var http_IP = '127.0.0.1';

var server = http.createServer(function (req, res) {
    router.route(req,res);
});

app.prototype.get = function(urlComponent , callback){
    router.routesArray['GET'][urlComponent] = callback;
};

app.prototype.post = function(urlComponent , callback){
    router.routesArray['POST'][urlComponent] = callback;
};

//other methods to be implemented delete , put etc

app.prototype.listen = function(port , callback){

    server.listen(port,http_IP);
    callback();
};

module.exports = function(){
    return new app();
};
