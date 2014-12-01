var mongoose = require('mongoose');
var Meis = mongoose.model('Mei');
var fs = require('fs-extra');

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
	    for (var im in images) {
		image = fs.readFileSync(images[im]);
		meis.images.files.push({'user':user, 'image': image});
	    }
	    meis.comments.posts.push({'user':user, 'comment': comment});
	    console.log('>>',meis);
	    
	    Meis.update({'name': name}, meis.toObject(), function(err) {
		console.log(err);
		if (err) res.sendStatus(500, err);
		else
		    res.sendStatus(200);
	    });
	}
    });
};
