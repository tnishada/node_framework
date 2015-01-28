var app =  function(){};

var router = require('./router.js')();
var http = require('http');
var http_IP = '127.0.0.1';


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


    /*

    if(typeof  callback == "undefined"){ // when  only the callback used to call the function without url

        callback = url;
        url = "anyRequest"
    }

    var entry = new Object();
    entry[url] = callback;
    router.middlewareArray.push(entry);
    */
};


module.exports = function(){
    return new app();
};
