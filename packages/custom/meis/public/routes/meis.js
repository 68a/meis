'use strict';

angular.module('mean.meis')
    .config(['$stateProvider',
	     function($stateProvider) {
		 $stateProvider.state('meis example page', {
		     url: '/meis/example',
		     templateUrl: 'meis/views/index.html'
		 })
		     .state('create meis', {
			 url: '/meis/create',
			 templateUrl: 'meis/views/create.html'
		     });
	     }
	    ]);
