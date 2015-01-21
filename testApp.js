/**
 * Created by tharindu on 1/21/2015.
 */

var app = require('./tns.js').app;

app.get('/', function(req , res){
    res.send("hello this is from test app");
   // console.log("got the request to the main url");
});

app.get('/home',function(req , res){
    res.send("this is from home");
});

app.listen(4000 , function(){
    console.log('listening on port');
});