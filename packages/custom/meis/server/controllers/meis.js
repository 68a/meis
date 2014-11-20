'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Meis = mongoose.model('Mei'),
  _ = require('lodash');


/**
 * Find meis by id
 */
exports.meis = function(req, res, next, id) {
  Meis.load(id, function(err, meis) {
    if (err) return next(err);
    if (!meis) return next(new Error('Failed to load meis ' + id));
    req.meis = meis;
    next();
  });
};

/**
 * Create an meis
 */
exports.create = function(req, res) {
  var meis = new Meis(req.body);
    meis.user = req.user;


  meis.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the meis'
      });
    }
    res.json(meis);

  });
};

/**
 * Update an meis
 */
exports.update = function(req, res) {
  var meis = req.meis;

  meis = _.extend(meis, req.body);

  meis.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the meis'
      });
    }
    res.json(meis);

  });
};

/**
 * Delete an meis
 */
exports.destroy = function(req, res) {
  var meis = req.meis;

  meis.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the meis'
      });
    }
    res.json(meis);

  });
};

/**
 * Show an meis
 */
exports.show = function(req, res) {
  res.json(req.meis);
};

/**
 * List of Meiss
 */
exports.all = function(req, res) {
  Meis.find().sort('-created').populate('user', 'name username').exec(function(err, meiss) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the meiss'
      });
    }
    res.json(meis);

  });
};
