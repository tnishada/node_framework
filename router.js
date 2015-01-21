/**
 * Created by tharindu on 1/21/2015.
 */
var router = {
    routesArray : {},
    route : function(req , res){

        //handle favicon url by the routing function itself
        if (req.url === '/favicon.ico') {
            res.writeHead(200, {'Content-Type': 'image/x-icon'} );
            res.end();
            console.log('favicon requested');
            return;
        }
        try{
            responseObj.response = res;
            this.routesArray[req.url](req , responseObj);
        }
        catch(err){
            console.log("requested url not found");
        }
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

module.exports.router = router;