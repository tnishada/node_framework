/**
 * Created by tharindu on 1/21/2015.
 */
var router = function(){};
    router.prototype.routeTypes = ['GET','POST','PUT','DELETE'];
    router.prototype.routesArray  = {'GET':{},'POST':{},'DELETE':{},'PUT':{}};
    router.prototype.route = function(req , res){

        //handle favicon url by the routing function itself
        if (req.url === '/favicon.ico') {
            res.writeHead(200, {'Content-Type': 'image/x-icon'} );
            res.end();
            console.log('favicon requested');
            return;
        }

        if(isBadRequest(req  , this.routeTypes)){
            res.writeHead(405, {'Content-Type': 'image/x-icon'} );
            res.end();
            console.log('Bad Request '+ req.method);
            return;
        }

        if(!isResourceFound(req,this.routesArray)){
            res.writeHead(404, {'Content-Type': 'image/x-icon'} );
            res.end();
            console.log('requested url not found |'+ req.method+'|'+req.url+"|");
            return;
        }

        try{
            responseObj.response = res;
            this.routesArray[req.method][req.url](req , responseObj);
        }
        catch(err){
            res.writeHead(404, {'Content-Type': 'text/plain'} );
            res.end('not found');
            console.log(err.message+"|"+ req.method+'|'+req.url+"|");
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

var isBadRequest = function(req , reqTypes){
    for(var x =0 ; x<reqTypes.length ; x++){
        if(req.method == reqTypes[x]){
            return false;
        }
    }
    return true;
};

var isResourceFound = function(req , urlCollection){
    if( typeof urlCollection[req.method][req.url] === "undefined"){
        return false;
    }
    return true;
};