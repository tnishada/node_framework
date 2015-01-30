var app =  function(){};

var router = require('./router.js')();
var http = require('http');
var http_IP = '127.0.0.1';
var cons = require('consolidate');


var server = http.createServer(function (req, res) {
    router.route(req,res);
});

router.routeTypes.forEach(function(httpMethod){
    app.prototype[httpMethod.toLowerCase()] = function(urlComponent , callback){
        router.routesArray[httpMethod][urlComponent] = callback;
    };
});

app.prototype.listen = function(port , callback){

    server.listen(port,http_IP);
    callback();
};

app.prototype.close = function(){
    server.close();

};

// when the callback and the corresponding url given
app.prototype.use = function(url , callback){
    router.middleware.addMiddleware(url , callback);
};

app.prototype.render = function(pageLocation , paramObj , callback){
    var components = pageLocation.split('.');
    var extension = components[components.length -1];

    // views folder is added default
    pageLocation = "./views/" + pageLocation;

    cons[extension](pageLocation , paramObj , callback);
};

module.exports = function(){
    return new app();
};
