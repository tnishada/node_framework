/**
 * Created by tharindu on 1/26/2015.
 */
var Request = function(req){

    this.request = req,
    this.parameters = new Object()
};

module.exports = function(req){
    return new Request(req);
};