/**
 * Created by tharindu on 1/26/2015.
 */
var fs = require('fs');


var Response = function(){
    this.response = Object,
        this.send = function(responseMessage){
            this.response.writeHead(200, { 'Content-Type': 'text/html' });
            this.response.end(responseMessage);
        },
        this.sendFile = function(filePath){
            var content = fs.readFileSync(filePath);
            this.response.writeHead(200, {'Content-Type': 'text/html'});
            this.response.end(content);
        }
    //sendJSON()
    //etc
};

module.exports = function(){
    return new Response();
};