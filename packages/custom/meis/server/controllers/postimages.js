var mongoose = require('mongoose');
var Meis = mongoose.model('Mei');
var fs = require('fs-extra');
// http://stackoverflow.com/questions/16222116/error-spawn-enoent-while-using-gm-in-node
var gm = require('gm').subClass({ imageMagick: true });

exports.postImages = function(req, res) {
    console.log("---postImage---", req.body);
    var name = req.body.name;
    var images = req.body.images;
    var comment = req.body.comment;
    var user = req.body.user;
    var meis = new Meis();
    meis.name = name;
    meis.user = req.user;
    
    meis.comments.posts.push({'user':user, 'comment': comment}, function(err) {
	for (var im in images) {
	    console.log('>', images[im]);
	    gm(images[im])
		.size(function (err, data) {
		    console.log('&&&', err);
		    if (!err) console.log(data)
		});

	    //	image = fs.readFileSync(images[im]);
	    gm(images[im]).resize(240,240).toBuffer(function (err, buffer) {
		console.log('***', buffer);
		if (err) return handle(err);
		console.log('done!');
		meis.images.files.push({'user':user, 'image': buffer}, function(err) {
		    console.log('>>>>', err);
		} );
	    });
	}
	meis.save(function(err) {
	    if (err) {
		console.error(err);
		res.sendStatus(500);
	    }
	    else {
		res.sendStatus(200);
	    }
	});
	
    });
};
