var mongoose = require('mongoose');
var Mei = mongoose.model('Mei');
var fs = require('fs-extra');

exports.search = function(req, res) {
    console.log("---Search---", req.params);
    queryString = req.params;
    query = new RegExp(queryString.query, 'i');
    Mei.find({'$or': [{'name': query}, {'comments.posts.comment': query}]}).exec(function(err, meis) {	
	if (err) {
	    return res.json(500, {
		error: 'Cannot list the meis'
	    });
	}
	res.json(meis);
    });
}
