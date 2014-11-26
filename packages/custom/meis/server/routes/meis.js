'use strict';

var meis = require('../controllers/meis');

var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.mei.user.id !== req.user.id) {
	return res.send(401, 'User is not authorized');
    }
    next();
};

// The Package is past automatically as first parameter
module.exports = function(Meis, app, auth, database) {
    var upload = require('../controllers/upload');
    var postImages = require('../controllers/postimages');
    var mm = require('../controllers/mm');

    app.route('/upload').post(upload.postImage);

    app.route('/meis')
	.get(meis.all)
	.post(auth.requiresLogin, meis.create);

    app.route('/meis/:meiId')
	.get(meis.show)
	.put(auth.requiresLogin, hasAuthorization, meis.update)
	.delete(auth.requiresLogin, hasAuthorization, meis.destroy);
    
    app.route('/mm/:query')
	.get(mm.search);


    app.route('/postimages')
	.post(postImages.postImages);

    app.get('/meis/example/anyone', function(req, res, next) {
	res.send('Anyone can access this');
    });

    app.get('/meis/example/auth', auth.requiresLogin, function(req, res, next) {
	res.send('Only authenticated users can access this');
    });

    app.get('/meis/example/admin', auth.requiresAdmin, function(req, res, next) {
	res.send('Only users with Admin role can access this');
    });

    app.get('/meis/example/render', function(req, res, next) {
	Meis.render('index', {
	    package: 'meis'
	}, function(err, html) {
	    //Rendering a view from the Package server/views
	    res.send(html);
	});
    });
    app.param('meiId', meis.mei);

};
