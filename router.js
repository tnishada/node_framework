/**
 * Created by tharindu on 1/21/2015.
 */
var response = require('./objects/response.js');
var request = require('./objects/request.js');
var middlewareHandler = require('./middleware.js');



var router = function(){};

    router.prototype.middleware = middlewareHandler();
    router.prototype.routeTypes = ['GET','POST','PUT','DELETE'];
    router.prototype.routesArray  = {'GET':{},'POST':{},'DELETE':{},'PUT':{}};
    router.prototype.middlewareArray = [];
    router.prototype.route = function(req , res){

        //remove case sensitivity of the url
        req.url = req.url.toLowerCase();

        //handle favicon url by the routing function itself
        if (req.url === '/favicon.ico') {
            res.writeHead(200, {'Content-Type': 'image/x-icon'} );
            res.end();
            return;
        }

        //execute middleware function

        this.middleware.executeMiddlewares(req , res);

        /*
        for(var index =0 ; index < this.middlewareArray.length ; index++){


            if(this.middlewareArray[index].hasOwnProperty(req.url) || this.middlewareArray[index].hasOwnProperty("anyRequest")) {
                var breakEnabled = true;
                this.middlewareArray[index][req.url](req, res, function () {
                    breakEnabled = false;
                });

                if(breakEnabled){
                    break;
                }
            }
        }
        */

        if(isBadRequest(req  , this.routeTypes)){
            res.writeHead(405, {'Content-Type': 'text/plain'} );
            res.end();
            console.log('Bad Request '+ req.method);
            return;
        }

        var resObj = response();
        resObj.response = res;
        var givenURLs = this.routesArray[req.method];
        var requestURL = req.url;

        try{
            for(var x in givenURLs){
                if(x === requestURL){
                    this.routesArray[req.method][req.url](request(req) , resObj);
                    return;
                }
                else{
                    var requestObject = checkParams(x , req);
                    if(requestObject != null){
                      this.routesArray[req.method][x.toString()](requestObject , resObj);
                        return;
                    }
                    requestObject = checkRegEx(x , req);
                    if(requestObject != null){
                        this.routesArray[req.method][x.toString()](requestObject , resObj);
                    }
                }
            }
            // return with url not found here
            res.writeHead(404, {'Content-Type': 'text/plain'} );
            res.end('Not Found');
            console.log('requested url not found '+"method="+ req.method+' url='+req.url);
            /////////////////////////////////////////
        }
        catch(err){
            res.writeHead(404, {'Content-Type': 'text/plain'} );
            res.end('Not found');
            console.log(err.message+". method="+ req.method+' url='+req.url);
        }
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

var checkParams = function(x , req){
    var requestUrlComponents = req.url.split("/");
    var savedUrlComponents = x.split("/");
    var ro = request(req);

    if(requestUrlComponents.length == savedUrlComponents.length){
        var urlFound = true;
        for(var i = 0 ; i< savedUrlComponents.length ; i++ ){
            if(savedUrlComponents[i] != requestUrlComponents[i]){
                if(savedUrlComponents[i].charAt(0) == ':'){ // ok

                    ro.parameters[savedUrlComponents[i].substring(1)] = requestUrlComponents[i];
                }
                else{
                    //  url not found break inner loop
                    urlFound = false;
                }
            }
        }
        if(urlFound){
            return ro;
        }
    }
    return null;
};

var checkRegEx = function(x , req){
    var pattern = new RegExp(x);
    if(  pattern.exec(req.url) != null){

        if( req.url == pattern.exec(req.url)[0] && pattern.exec(req.url).length ==1 ){
            var ro = new request(req);
            return ro;
        }
    }
    else{
        return null;
    }
};