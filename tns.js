var app = this;

var routes = {};

var http = require('http');
var http_IP = '127.0.0.1';

/*default values for testing*/
var http_port = 3000;

var server = http.createServer(function (req, res) {

    //handle favicon url by the server itself
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        console.log('favicon requested');
        return;
    }

    try{
            responseObj.response = res;
            routes[req.url](req , responseObj);
    }
    catch(err){
        console.log("requested url not found");
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, world!\n');
});

app.get = function(urlComponent , callback){
    routes[urlComponent] = callback;
};

app.listen = function(port , callback){
    http_port = port;
    server.listen(http_port,http_IP);
    callback();
};

module.exports.app = app;


var responseObj = {
    response : Object,
    send : function(responseMessage){
        this.response.writeHead(200, { 'Content-Type': 'text/plain' });
        this.response.end(responseMessage);
    }
    //sendFile()
    //sendJSON()
    //etc
};



