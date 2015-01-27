/**
 * Created by tharindu on 1/20/2015.
 */
var assert = require("assert");
var http = require('http');
var app = require('./../nodeFramework.js')();

before(function(){
    app.get("/",function(req , res){        
        res.send("get_method");
    });

    app.post("/home",function(req , res){      
        res.send("post_method");
    });

    app.put("/",function(req , res){       
        res.send("");
    });

    app.get("/user/:name",function(req , res){
        res.send(req.parameters.name);
    });

    app.get("/user/:name/:age",function(req , res){
        res.send(req.parameters.name+" "+req.parameters.age);
    });

    app.get("/[xyz]+",function(req , res){
        res.send(req.request.url);
    });

    app.listen(3000 , function(){
    });
});

after(function(){
    app.close();
});

describe('server status', function () {
    it('server is running', function (done) {
        http.get('http://localhost:3000', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});


describe('http methods test', function () {

    var postOptions = {
        host: 'localhost',
        port:'3000',
        method:'POST',
        path:'/home'
    };

    var putOptions = {
        host: 'localhost',
        port:'3000',
        method:'PUT'
    };

    it('GET method check', function ( done) {
        http.get('http://localhost:3000', function (res) {
            assert.equal( res.statusCode , 200 );
            res.on('data', function (chunk) {
                assert.equal(chunk , "get_method");
            });
            //console.log(res);
            done();
        });
    });

    it('POST method check', function ( done) {
        http.request(postOptions, function (res) {
            assert.equal( res.statusCode , 200 );
            res.on('data', function (chunk) {
                assert.equal(chunk , "post_method");
            });
            done();
        }).end();
    });


    it('PUT method check', function ( done) {
        http.request(putOptions, function (res) {
            assert.equal( res.statusCode , 200 );
            done();
        }).end();
    });


});

describe("Parameter passing" , function(){
    it('Single parameter', function ( done) {
        http.get('http://localhost:3000/user/testuser', function (res) {
            assert.equal( res.statusCode , 200 );
            res.on('data', function (chunk) {
                assert.equal(chunk , "testuser");
            });

            done();
        });
    });

    it('Two parameters', function ( done) {
        http.get('http://localhost:3000/user/testuser/24', function (res) {
            assert.equal( res.statusCode , 200 );
            res.on('data', function (chunk) {
                assert.equal(chunk , "testuser 24");
            });

            done();
        });
    });
});


describe("Regular Expresstion test", function(){
    it('Check for valid urls', function ( done) {
        http.get('http://localhost:3000/xzxyzxy', function (res) {
            assert.equal( res.statusCode , 200 );
            //console.log(res);
            done();
        });


    });

    it('Check for invalid urls', function ( done) {

        http.get('http://localhost:3000/xzxyzxycde45x', function (res) {
            assert.notEqual( res.statusCode , 200 );
            //console.log(res);
            done();
        });
    });
});



