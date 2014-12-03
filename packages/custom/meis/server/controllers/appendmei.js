var mongoose = require('mongoose');
var Meis = mongoose.model('Mei');
var fs = require('fs-extra');
var gm = require('gm').subClass({ imageMagick: true });

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
		var count = images.length;
		for (var im in images) {

		    gm(images[im]).resize(240,240).toBuffer(function (err, buffer) {
			
			if (err) return handle(err);

			meis.images.files.push({'user':user, 'image': buffer});
			count = count - 1;

			if (count == 0) {
			    Meis.update({'name': name}, meis.toObject(), function(err) {
				if (err) res.sendStatus(500, err);
				else
				    res.sendStatus(200);
				
			    });
			}
		    });
		}
	    }
	}
    });
};
