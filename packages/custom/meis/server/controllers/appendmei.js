'use strict';

var mongoose = require('mongoose');
var Meis = mongoose.model('Mei');
var pt = require('./processthumb.js');

var appendImagesAndThumbnails = function(name, meis, res, Meis) {
    Meis.update({'name': name}, meis.toObject(), function(err) {
	if (err) {
	    console.error(err);
	    res.sendStatus(500);
	}
	else {
	    res.sendStatus(200);
	}
    });
    
};

exports.appendMei = function(req, res) {
    var name = req.body.name;
    var images = req.body.images;
    var comment = req.body.comment;
    var user = req.body.user;
    var _id = req.body._id;
    var im = req.body.im;
    var mobile = req.body.mobile;

    console.log('>>>>', req.body);

//    var query = Meis.where({'name': name});
    var query = Meis.where({'_id': _id});
    query.findOne(function(err, mei) {
	if (err)
	    return res.status(500).send({error: err});
	if (mei) {
	    var meis = new Meis(mei);
	    meis.comments.posts.push({'user':user, 'comment': comment});
	    meis.name = name;
	    meis.im = im;
	    meis.mobile = mobile;
	    if (images.length === 0) {
		Meis.update({'_id': _id}, meis.toObject(), function(err) {
		    if (err) res.sendStatus(500, err);
		    else
			res.sendStatus(200);
		    
		});
	    }
	    else {
		pt.processThumbnailAndImage(user, name, images, meis, res, Meis, appendImagesAndThumbnails);
	    }
	}
    });
};
