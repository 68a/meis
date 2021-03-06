'use strict';

angular.module('mean.meis')
    .config(['$stateProvider',
	     function($stateProvider) {
		 var checkLoggedin = function($q, $timeout, $http, $location) {
		     // Initialize a new promise
		     var deferred = $q.defer();

		     // Make an AJAX call to check if the user is logged in
		     $http.get('/loggedin').success(function(user) {
			 // Authenticated
			 if (user !== '0') $timeout(deferred.resolve);

			 // Not Authenticated
			 else {
			     $timeout(deferred.reject);
			     $location.url('/login');
			 }
		     });

		     return deferred.promise;
		 };

		 $stateProvider.state('all meis', {
		     url: '/meis/list',
		     templateUrl: 'meis/views/list.html'
		 })
		     .state('create mei', {
			 url: '/meis/create',
			 templateUrl: 'meis/views/create.html'
		     })
		     .state('edit mei', {
			 url: '/meis/:meiId/edit',
			 templateUrl: 'meis/views/edit.html',
			 resolve: {
			     loggedin: checkLoggedin
			 }
		     })

		     .state('search mei', {
			 url: '/meis/search',
			 templateUrl: 'meis/views/search.html'
		     })
		     .state('mei by id', {
			 url: '/meis/:meiId',
			 templateUrl: 'meis/views/view.html',
			 resolve: {
			     loggedin: checkLoggedin
			 }
		     });
	     }
	    ]);
