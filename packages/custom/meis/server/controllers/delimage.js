'use strict';
var mongoose = require('mongoose');
var Meis = mongoose.model('Mei');

exports.delImage = function(req, res) {
    console.log('***>', req.body);
    var data = req.body;
    console.log(data._id, data.image_name);
    Meis.update({_id: data._id},
		{$pull: {'images.files':{image_name: data.image_name}}}, function(err) {
		    if (err) {
			return res.json(500, { error: 'Failed to delete image.'});
		    };
		    res.json('');
		    return 0;
		});
    
};
