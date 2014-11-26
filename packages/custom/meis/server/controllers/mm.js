var mongoose = require('mongoose');
var Meis = mongoose.model('Mei');
var fs = require('fs-extra');

exports.search = function(req, res) {
    console.log("---Search---", req.params);
};
