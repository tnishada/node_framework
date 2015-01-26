/**
 * Created by tharindu on 1/21/2015.
 */

var nodeFramework = require('./nodeFramework.js');
var app = nodeFramework();

app.get('/home', function(req , res){
    console.log('home');
    res.send("get method - this is home");
    // console.log(req);
});

app.get('/', function(req , res){
    console.log('get method called');
    res.send("get method - this is root");
   // console.log(req);
});
app.post('/',function(req, res){
    res.send("post - this is root");
    console.log('post method called');

});

app.put('/',function(req, res){
    res.send("put - this is root");
    console.log('put method called');
});

app.get('/hello',function(req,res){
	res.sendFile('./test/test.html');
});

app.get('/hello/:name', function(req, res) {
    res.send('hello ' + req.parameters.name + '!');
});

app.get('/hello/:name/:age', function(req, res) {
    res.send('hello ' + req.parameters.name + '!' + "You are "+req.parameters.age);
});

app.listen(3000 , function(){
    console.log('listening on port');
});