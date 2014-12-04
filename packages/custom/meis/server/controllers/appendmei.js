var mongoose = require('mongoose');
var Meis = mongoose.model('Mei');
var gm = require('gm').subClass({ imageMagick: true });
var pt = require('./processthumb.js');

var appendImagesAndThumbnails = function(meis, res, Meis) {
    Meis.update({'name': name}, meis.toObject(), function(err) {
	if (err) {
	    console.error(err);
	    res.sendStatus(500);
	}
	else {
	    res.sendStatus(200);
	}
    });
    
}

exports.appendMei = function(req, res) {
    console.log("---append mei---", req.body);
    var name = req.body.name;
    var images = req.body.images;
    var comment = req.body.comment;
    var user = req.body.user;

    var query = Meis.where({'name': name});
    query.findOne(function(err, mei) {
	if (err)
	    return res.status(500).send({error: err});
	if (mei) {
	    var meis = new Meis(mei);
	    meis.comments.posts.push({'user':user, 'comment': comment});

	    if (images.length == 0) {
		Meis.update({'name': name}, meis.toObject(), function(err) {
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
}
