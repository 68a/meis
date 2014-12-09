'use strict';

angular.module('mean.meis')
.directive('uploadwidget', function() {
    return {
	restrict: 'E',
	templateUrl: 'meis/directives/uploadwidget.html',
	link: function () {
	    console.log('upload widget');
	}
    };
});
