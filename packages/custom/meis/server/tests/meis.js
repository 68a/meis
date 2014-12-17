'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
var crypto = require('crypto');
var Mei = mongoose.model('Mei');


/**
 * Create a random hex string of specific length and
 * @todo consider taking out to a common unit testing javascript helper
 * @return string
 */
function getRandomString(len) {
  if (!len)
    len = 16;

  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex');
}

/**
 * Globals
 */
var user;
var mei;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
    describe('Model Mei:', function() {
	beforeEach(function(done) {
	    user = new User({
		name: 'Full name',
		email: 'test@test.com',
		username: 'user',
		password: 'password'
	    });

	    user.save(function() {
		mei = new Mei({
		    user: user,
		    name: getRandomString(),
		    commnets: { posts: [ 'aaa', 'bbb', 'ccc'] },
		    provider: 'local'
		});

		done();
	    });
	});

	describe('Method Save', function() {
	    it('should be able to save without problems', function(done) {
		return mei.save(function(err) {
		    should.not.exist(err);
		    mei.name.should.not.have.length(0);
		    mei.user.should.not.have.length(0);
		    mei.created.should.not.have.length(0);
		    done();
		});
	    });

	    after(function(done) {

		/** Clean up user objects
		 * un-necessary as they are cleaned up in each test but kept here
		 * for educational purposes
		 *
		 *  var _user1 = new User(user1);
		 *  var _user2 = new User(user2);
		 *
		 *  _user1.remove();
		 *  _user2.remove();
		 */

		done();
	    });
	});
    });
});
