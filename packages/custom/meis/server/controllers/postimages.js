'use strict';

var mongoose = require('mongoose');
var Meis = mongoose.model('Mei');


var pt = require('./processthumb.js');

var saveImagesAndThumbnails = function (name, meis, res, Meis) {
    meis.save(function(err) {
	if (err) {
	    console.error(err);
	    res.sendStatus(500);
	}
	else {
	    res.sendStatus(200);
	}
    });
};

exports.postImages = function(req, res) {
    var name = req.body.name;
    var images = req.body.images;
    var comment = req.body.comment;
    var user = req.body.user;
    var meis = new Meis();
    meis.name = name;
    meis.user = req.user;

    meis.comments.posts.push({'user':user, 'comment': comment});
    if (images.length === 0) {
	meis.save(function(err) {
	    if (err) {
		res.sendStatus(500);
	    }
	    else {
		res.sendStatus(200);
	    }
	});
    }
    else {
	pt.processThumbnailAndImage(user, name, images, meis, res, Meis, saveImagesAndThumbnails);
    }
    
};
