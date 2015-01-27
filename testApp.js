/**
 * Created by tharindu on 1/21/2015.
 */

var nodeFramework = require('./nodeFramework.js');
var app = nodeFramework();

/*
app.get('/hello',function(req,res){
	res.sendFile('./test/test.html');
});
*/

app.get('/hi/:firstName/:lastName', function(req, res) {
    res.send('hi ' + req.parameters.firstName +' '+req.parameters.lastName+ ' !');
});

app.get("/regex/[xyz]+",function(req , res){
    res.send(req.request.url);
});





app.listen(3000 , function(){
    console.log('listening on port');
});