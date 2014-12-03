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
    console.log('meis:', meis);

    meis.comments.posts.push({'user':user, 'comment': comment});
    if (images.length == 0) {
	meis.save(function(err) {
	    if (err) {
		console.error(err);
		res.sendStatus(500);
	    }
	    else {
		res.sendStatus(200);
	    }
	});
    }
    else {
	var getThumbnailAndImage = function(max_len, idx, t, n) {
	    Array.prototype.sortOn = function(key){
		this.sort(function(a, b){
		    if(a[key] < b[key]){
			return -1;
		    }else if(a[key] > b[key]){
			return 1;
		    }
		    return 0;
		});
	    }
	    if (t.length == max_len && n.length == max_len) {
		t.sortOn('index');
		n.sortOn('index');
		for(var i = 0; i < max_len; i++) {
		    meis.images.files.push({'user':user, 'image': n[i].image, 'image_thumb': t[i].image});
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
	    }
	}
	var normal_images = [];
	var thumbnails = [];

	var funcs = [];

	for (var im in images) {
	    (function (idx, t, n) {
		console.log('idx:', idx);
		funcs.push(function() {
		    gm(images[idx])
			.size(function (err, data) {
			    if (!err) console.log(data)
			});
		    gm(images[idx]).resize(64,64).toBuffer(function (err, buffer) {
			t.push({'index': idx, 'image': buffer});
			console.log('im:', im, '->idx:',idx);
			getThumbnailAndImage(images.length, idx, t, n);
		    });
		    gm(images[idx]).toBuffer(function(err, buffer){
			n.push({'index': idx, 'image': buffer});
			console.log('max_len:', images.length, '-->idx:',idx, 't.length:', t.length, 'n.length:', n.length);
			getThumbnailAndImage(images.length, idx, t, n);
		    });
		});
		
	    })(im, thumbnails, normal_images);
	}
	for (var f in funcs) {
	    funcs[f]();
	}
    }
    
};
