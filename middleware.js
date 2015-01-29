/**
 * Created by tharindu on 1/28/2015.
 */

var Middleware = function(){};

Middleware.prototype.middlewareArray = [];
Middleware.prototype.addMiddleware = function( url , callback){


        if(typeof  callback == "undefined"){ // when  only the callback used to call the function without url

            callback = url;
            url = "anyRequest"
        }

        var entry = new Object();
        entry[url] = callback;
        this.middlewareArray.push(entry);
    };

Middleware.prototype.executeMiddlewares = function(reqObj , resObj){
    var req = reqObj.request;
    var res = resObj.request;

    for(var index =0 ; index < this.middlewareArray.length ; index++){

        if(this.middlewareArray[index].hasOwnProperty(req.url) || this.middlewareArray[index].hasOwnProperty("anyRequest")) {
            var breakEnabled = true;
            this.middlewareArray[index][req.url](reqObj, resObj, function () {
                breakEnabled = false;
            });

            if(breakEnabled){
                return true;
            }
        }
    }

    return false;
};

module.exports = function(){
    return new Middleware();
};