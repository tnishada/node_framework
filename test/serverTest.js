/**
 * Created by tharindu on 1/20/2015.
 */
var assert = require("assert");
var http = require('http');
var app = require('./../nodeFramework.js')();

before(function(){
    app.get("/",function(){
    });
    app.listen(3000 , function(){
    });
});

describe('server status', function () {
    it('server is running', function () {
        http.get('http://localhost:3000', function (res) {
            assert.equal(200, res.statusCode);
        });
    });
});

