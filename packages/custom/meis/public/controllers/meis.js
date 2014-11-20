'use strict';

angular.module('mean.meis', ['angularFileUpload'])
    .controller(
	'MeisController',
	['$scope', '$http', '$stateParams',
	 '$location','Global', 'Meis',
	 'FileUploader',
	 function($scope, $http, $stateParams, $location, Global, Meis, FileUploader) {
	     $scope.global = Global;
	     $scope.files = [];
	     $scope.uploader = new FileUploader( {
		 url: '/upload',
		 method: 'POST'
	     });
	     $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
		 //console.info('onCompleteItem', fileItem, response, status, headers);
		 $scope.files.push(response[0][1].path);
		 console.info('on complete', response[0][1].path);
		 console.info($scope.files);
             };

	     $scope.hasAuthorization = function(article) {
		 if (!article || !article.user) return false;
		 return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
	     };

	     $scope.create = function(isValid) {
		 if (isValid) {
		     var meis =
			 {
			     'name': $scope.name,
			     'images': $scope.files,
			     'comment': $scope.comment
			 };
		     
		     $http.post('/postimages', meis);
			 

		 } else {
		     $scope.submitted = true;
		 }
	     };

	 }
		     ]);
