/**
 * Created by tharindu on 1/21/2015.
 */

var nodeFramework = require('./nodeFramework.js');
var app = nodeFramework();

app.get('/', function(req , res){
    console.log('get method called');
    res.send("hello this is from test app");
});

app.post('/',function(req, res){
    res.send("got a post request");
    console.log('post method called');
});

app.put('/',function(req, res){
    res.send("got a put request");
    console.log('put method called');
});

app.get('/hello',function(req,res){
	res.sendFile('./test/test.html');
});

app.listen(4000 , function(){
    console.log('listening on port');
});