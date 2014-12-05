'use strict';

var mongoose = require('mongoose');
var Mei = mongoose.model('Mei');

exports.search = function(req, res) {
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
