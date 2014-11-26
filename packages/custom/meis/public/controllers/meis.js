'use strict';

angular.module('mean.meis', ['angularFileUpload'])
    .controller(
	'MeisController',
	['$scope', '$http', '$stateParams',
	 '$location','Global', 'Meis',
	 'FileUploader', 'Mm',
	 function($scope, $http, $stateParams, $location, Global, Meis, FileUploader, Mm) {
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
			     'comment': $scope.comment,
			     'user': $scope.global.user.name
			 };
		     console.log('user:' + $scope.global.user.name);
		     $http.post('/postimages', meis). success(function(data, status, headers, config) {
			 console.log('success');
		     }).
			 error(function(data, status, headers, config) {
			     console.log('error');

			 });;
		     

		 } else {
		     $scope.submitted = true;
		 }
	     };
	     $scope.find = function() {

		 Meis.query(function(meis) {
		     $scope.meis = meis;

		 });
	     };

	     $scope.findOne = function() {
		 console.log($stateParams.meiId);
		 Meis.get({
		     meiId: $stateParams.meiId
		 }, function(mei) {
		     $scope.mei = mei;
		 });
	     };
	     $scope.search = function() {
		 console.log('search....');
		 Mm.search({ query:'aaa' },
			   function(result){
			       console.log('search result...');
			   });
	     }
	 }
	]);
