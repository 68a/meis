'use strict';

var formidable = require('formidable');

var mongoose = require('mongoose');

exports.postImage = function(req, res) {
    var form = new formidable.IncomingForm();

    var files = [];
    var fields = [];
    form
	.on('field', function(field, value) {

            fields.push([field, value]);
	})
	.on('file', function(field, file) {

            files.push([field, file]);
	})
	.on('end', function() {
            console.log('-> upload done...', files);

            res.writeHead(200, {'content-type': 'application/json'});

	    res.end(JSON.stringify(files));
	});

    form.parse(req);

};			

