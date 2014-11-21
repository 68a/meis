var mongoose = require('mongoose');
var Meis = mongoose.model('Mei');
var fs = require('fs-extra');

exports.postImages = function(req, res) {
    console.log("---postImage---", req.body);
    var name = req.body.name;
    var images = req.body.images;
    var comment = req.body.comment;
    var user = req.body.user;
    meis = new Meis();
    meis.name = name;
    for (var im in images) {
	console.log(images[im]);
	image = fs.readFileSync(images[im]);
	meis.images.files.push({'user':user, 'image': image});
    }
    meis.comments.posts.push({'user':user, 'comment': comment});
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
