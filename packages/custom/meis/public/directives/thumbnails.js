'use strict';

angular.module('mean.meis')
.directive('thumbnailsrow', function() {
    return {
	restrict: 'E',
	templateUrl: 'meis/directives/thumbnails.html',
	link: function () {
	    console.log('link');
	}
    };
});
