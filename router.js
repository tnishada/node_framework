/**
 * Created by tharindu on 1/21/2015.
 */
var fs = require('fs');
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

/*
        if(!isResourceFound(req,this.routesArray) && !regEx){
            res.writeHead(404, {'Content-Type': 'image/x-icon'} );
            res.end();
            console.log('requested url not found '+"method="+ req.method+' url='+req.url);
            return;
        }
*/
        try{
            /*
            var resObj = new responseObj();
            resObj.response = res;
            this.routesArray[req.method][req.url](new reqObj(req , this.routesArray) , resObj);
            */
            /////////////////////////////////////////////////
            var resObj = new responseObj();
            resObj.response = res;


            var givenURLs = this.routesArray[req.method];
            var requestURL = req.url;

            for(var x in givenURLs){

                if(x === requestURL){
                    console.log("url matched");
                    this.routesArray[req.method][req.url](new reqObj(req) , resObj);
                    return;
                }
                else{
                    var requestUrlComponents = requestURL.split("/");
                    var savedUrlComponents = x.split("/");

                    if(requestUrlComponents.length != savedUrlComponents.length){
                        // url not found. continue loop
                        continue;
                    }
                    else{
                        var urlFound = true;
                        for(var i = 0 ; i< savedUrlComponents.length ; i++ ){
                            if(savedUrlComponents[i] != requestUrlComponents[i]){
                                if(savedUrlComponents[i].charAt(0) == ':'){ // ok
                                    var ro = new reqObj(req);
                                    ro.parameters[savedUrlComponents[i].substring(1)] = requestUrlComponents[i];

                                   // this.routesArray[req.method][req.url](ro , resObj);
                                   // x(ro , resObj);

                                }
                                else{
                                    //  url not found break inner loop
                                    urlFound = false;
                                }
                            }
                        }
                        if(urlFound){
                            this.routesArray[req.method][x.toString()](ro , resObj);
                            return;
                        }

                    }

                }

            }

            // return with url not found here
            res.writeHead(404, {'Content-Type': 'image/x-icon'} );
            res.end();
            console.log('requested url not found '+"method="+ req.method+' url='+req.url);
            /////////////////////////////////////////

        }
        catch(err){
            res.writeHead(404, {'Content-Type': 'text/plain'} );
            res.end('not found');
            console.log(err.message+". method="+ req.method+' url='+req.url);
        }
    };

var responseObj = function(){
    this.response = Object,
    this.send = function(responseMessage){
        this.response.writeHead(200, { 'Content-Type': 'text/plain' });
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

var reqObj = function(req){

    this.request = req,
    this.parameters = new Object()
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
