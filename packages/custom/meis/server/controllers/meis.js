'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Mei = mongoose.model('Mei'),
  _ = require('lodash');


/**
 * Find meis by id
 */
exports.mei = function(req, res, next, id) {

  Mei.load(id, function(err, mei) {
    if (err) return next(err);
    if (!mei) return next(new Error('Failed to load mei ' + id));
    req.mei = mei;
    next();
  });
};

exports.nextPage = function(req, res, after) {
/*
    Mei.find(query, fields, {skip:10, limit:5}, function(err, meis) {
	if (err) {
	    return res.json(500, {
		error: 'Cannot list the meis'
	    });
	}
	res.json(meis);
    });
*/
};
	    
/**
 * Create an mei
 */
exports.create = function(req, res) {
  var mei = new Mei(req.body);
    mei.user = req.user;


  mei.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the mei'
      });
    }
    res.json(mei);

  });
};

/**
 * Update an mei
 */
exports.update = function(req, res) {
  var mei = req.mei;

  mei = _.extend(mei, req.body);

  mei.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the mei'
      });
    }
    res.json(mei);

  });
};

/**
 * Delete an mei
 */
exports.destroy = function(req, res) {
  var mei = req.mei;

  mei.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the mei'
      });
    }
    res.json(mei);

  });
};

/**
 * Show an mei
 */
exports.show = function(req, res) {
  res.json(req.mei);
};

/**
 * List of Meis
 */
exports.all = function(req, res) {
    var page = req.query.page;
    var perPage = req.query.perPage;
    console.log(page, perPage);
    Mei.find().sort('-created').skip(page * perPage).limit(perPage).populate('user', 'name username').exec(function(err, meis) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the meis'
      });
    }
    res.json(meis);

  });
};
