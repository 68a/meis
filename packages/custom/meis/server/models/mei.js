'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    return (this.provider && this.provider !== 'local') || (value && value.length);
};

var validateUniqueEmail = function(value, callback) {
    var Mei = mongoose.model('Mei');

};

/**
 * Mei Schema
 */

var MeiSchema = new Schema({
    created: {
	type: Date,
	default: Date.now
    },
    name: {
	type: String,
	unique: true,
	required: true
    },
    images: {
	files: []
    },
    comments: {
	posts: []
    },
    user: {
	type: Schema.ObjectId,
	ref: 'User'
    },
    provider: {
	type: String,
	default: 'local'
    },

});

MeiSchema.static.saveImage = function(images, cb) {
    console.log('save images...');
};
/**
 * Methods
 */
MeiSchema.methods = {
};

MeiSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};


mongoose.model('Mei', MeiSchema);
