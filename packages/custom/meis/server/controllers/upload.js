var formidable = require('formidable'),
    util = require('util');

//var  fs = require('fs');
//var multiparty = require('multiparty');

var mongoose = require('mongoose');
var TmpImages = mongoose.model('TmpImages');

var fs = require('fs-extra');

exports.postImage = function(req, res) {
    var form = new formidable.IncomingForm();
    var user = req.user;

    form.on('progress', function(bytesReceived, bytesExpected) {
	console.log('progress...' + bytesReceived + ':' + bytesExpected);
    });

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

    form.parse(req, function(err, fileds, file) {

	console.log(files[0][1].path);

    });
};			

