/**
 * Created by tharindu on 1/20/2015.
 */
var assert = require("assert");
var http = require('http');
var server = require('./../tns.js');

describe('/', function () {
    it('should return 200', function (done) {
        http.get('http://localhost:3000', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });

})

