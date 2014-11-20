'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

/**
 * Temp Images Schema
 */

var TmpImagesSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  images: {
      files: []
  }
});

TmpImagesSchema.methods = {
};

mongoose.model('TmpImages', TmpImagesSchema);
