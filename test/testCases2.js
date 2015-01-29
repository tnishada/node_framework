/**
 * Created by tharindu on 1/28/2015.
 */
var http = require('http');
var assert = require("assert");
var app = require('./../nodeFramework.js')();

before(function(){
    app.get("/middleware",function(req , res){
        res.send("hello");
    });

    app.use("/middleware" , function( req , res , next){
        res.end("middleware_interruption1");
        next();
    });

    app.use("/middleware1" , function( req , res , next){
        res.end("middleware_interruption2");
        next();
    });

    app.use("/middleware3" , function( req , res , next){
        res.end("middleware_interruption2");
        next();
    });
});

describe("Middleware Test", function(){

    it('GET method check', function ( done) {
        http.get('http://localhost:3000/middleware', function (res) {
            assert.equal( res.statusCode , 200 );
            res.on('data', function (chunk) {
                assert.equal(chunk , "middleware_interruption1");
            });
            //console.log(res);
            done();
        });
    });


});

