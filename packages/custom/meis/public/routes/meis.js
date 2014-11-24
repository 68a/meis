'use strict';

angular.module('mean.meis')
    .config(['$stateProvider',
	     function($stateProvider) {
		 $stateProvider.state('all meis', {
		     url: '/meis/list',
		     templateUrl: 'meis/views/list.html'
		 })
		     .state('create mei', {
			 url: '/meis/create',
			 templateUrl: 'meis/views/create.html'
		     });
	     }
	    ]);
