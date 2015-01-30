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
        res.send("middleware_interruption");
        //next is not called since response is sent from the middleware
    });

    app.get("/template/jade", function(req , res){
        app.render('test.jade' , {name : "Alex"} , function(err , html){
            res.send(html);
        });
    });

    app.get("/template/ejs", function(req, res){
        app.render('test.ejs' , {code : "123"} , function(err , html){
            if(err != null){
                console.log(err);
            }
            res.send(html);
        });
    });
});

describe("Middleware Test", function(){

    it('Middleware interruption', function ( done) {
        http.get('http://localhost:3000/middleware', function (res) {
            assert.equal( res.statusCode , 200 );
            res.on('data', function (chunk) {
                assert.equal(chunk , "middleware_interruption");
                done();
            });

        });
    });
});

describe("Templates test", function(){
    it("Jade Template Test ", function(done){
        this.timeout(2000); // default value is also 2000ms
        http.get('http://localhost:3000/template/jade', function (res) {

            assert.equal( res.statusCode , 200 );
            res.on('data', function (chunk) {
                assert.equal(chunk , "Alex");
                done();
            });
            //console.log(res);

        });
    });

    it("Ejs Template Test ", function(done){
        this.timeout(2000); // default value is also 2000ms
        http.get('http://localhost:3000/template/ejs', function (res) {

            assert.equal( res.statusCode , 200 );
            res.on('data', function (chunk) {
                assert.equal(chunk , "123");
                done();
            });
            //console.log(res);

        });
    });
});

