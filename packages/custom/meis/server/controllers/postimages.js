var mongoose = require('mongoose');


var fs = require('fs-extra');

exports.postImages = function(req, res) {
    console.log("---postImage---", req.body);
    res.status(200);
};
