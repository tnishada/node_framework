/**
 * Created by tharindu on 1/21/2015.
 */
var router = function(){};
    router.prototype.routesArray  = {'GET':{},'POST':{},'DELETE':{},'PUT':{}};
    router.prototype.route = function(req , res){

        //handle favicon url by the routing function itself
        if (req.url === '/favicon.ico') {
            res.writeHead(200, {'Content-Type': 'image/x-icon'} );
            res.end();
            console.log('favicon requested');
            return;
        }
        try{
            responseObj.response = res;
            this.routesArray[req.method][req.url](req , responseObj);
        }
        catch(err){
            res.writeHead(404, {'Content-Type': 'text/plain'} );
            res.end('not found');
            console.log("requested url/method not found");
        }
    };

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

module.exports = function(){
    return new router();
};
