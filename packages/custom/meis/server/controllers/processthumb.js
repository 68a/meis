// http://stackoverflow.com/questions/16222116/error-spawn-enoent-while-using-gm-in-node
var gm = require('gm').subClass({ imageMagick: true });

exports.processThumbnailAndImage = function (user, name,  images, meis, res, Meis, func) {
    var getThumbnailAndImage = function(max_len, idx, t, n, func) {
	function keysrt(key) {
	    return function(a,b){
		if (a[key] > b[key]) return 1;
		if (a[key] < b[key]) return -1;
		return 0;
	    }
	}

	if (t.length == max_len && n.length == max_len) {
	    t.sort(keysrt('index'));
	    n.sort(keysrt('index'));
	    for(var i = 0; i < max_len; i++) {
		meis.images.files.push({'user':user, 'image': n[i].image, 'image_thumb': t[i].image});
	    }
	    func(meis, res, Meis);
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
		    getThumbnailAndImage(images.length, idx, t, n, func);
		});
		gm(images[idx]).toBuffer(function(err, buffer){
		    n.push({'index': idx, 'image': buffer});
		    console.log('max_len:', images.length, '-->idx:',idx, 't.length:', t.length, 'n.length:', n.length);

		    getThumbnailAndImage(images.length, idx, t, n, func);
		});
	    });
	    
	})(im, thumbnails, normal_images);
    }
    for (var f in funcs) {
	funcs[f]();
    }
    
}
