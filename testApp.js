/**
 * Created by tharindu on 1/21/2015.
 */

var nodeFramework = require('./nodeFramework.js');
var app = nodeFramework();

app.use( "/" , function(req , res , next ){
    console.log(req.request.url);
    next();
});

app.use( "/" , function(req , res , next ){
    
    res.send("root through middleware");
});

app.get("/",function(req , res){
    res.send("Root");
});


app.listen(3000 , function(){
    console.log('listening on port 3000');
});