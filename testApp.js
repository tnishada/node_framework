/**
 * Created by tharindu on 1/21/2015.
 */

var nodeFramework = require('./nodeFramework.js');
var app = nodeFramework();

app.get('/', function(req , res){
    res.send("hello this is from test app");
});

app.get('/home',function(req , res){
    res.send("this is from home");
});

app.post('/',function(req, res){
    res.send("got a post request");
    console.log(req);
});

app.listen(4000 , function(){
    console.log('listening on port');
});