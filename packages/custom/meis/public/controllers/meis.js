'use strict';

angular.module('mean.meis', ['angularFileUpload', 'ngDialog'])
    .controller(
	'MeisController',
	['$scope', '$http', '$stateParams',
	 '$location','Global', 'Meis',
	 'FileUploader', 'Mm', 'ngDialog',
	 function($scope, $http, $stateParams, $location, Global, Meis, FileUploader, Mm, ngDialog) {
	     $scope.global = Global;
	     $scope.files = [];
	     $scope.uploader = new FileUploader( {
		 url: '/upload',
		 method: 'POST'
	     });
	     
	     $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
		 console.log(response);
		 $scope.files.push(response[0][1].path);
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

		     $http.post('/postimages', meis). success(function(data, status, headers, config) {
			 console.log('success');
			 $location.path('meis/list');	     
		     }).
			 error(function(data, status, headers, config) {
			     console.log('error');
			     $location.path('meis/list');	     
			 });


		 } else {
		     $scope.submitted = true;
		 }
	     };
	     $scope.append = function(isValid) {
		 if (isValid) {

		     var meis =
			 {
			     'name': $scope.mei.name,
			     'images': $scope.files,
			     'comment': $scope.comment,
			     'user': $scope.global.user.name
			 };
		     console.log(meis);
		     $http.post('/appendmei', meis). success(function(data, status, headers, config) {
			 console.log('success');
			 $location.path('meis/list');	     
		     }).
			 error(function(data, status, headers, config) {
			     console.log('error');
			     $location.path('meis/list');	     

			 });

		 } else {
		     $scope.submitted = true;
		 }
	     };
	     $scope.remove = function(mei) {
		 if (mei) {
		     mei.$remove(function(response) {
			 for (var i in $scope.meis) {
			     if ($scope.meis[i] === mei) {
				 $scope.meis.splice(i, 1);
			     }
			 }
			 $location.path('meis/list');
		     });
		 } else {
		     $scope.mei.$remove(function(response) {
			 $location.path('meis/list');
		     });
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
		 console.log('search....', $scope.searchString);
		 Mm.search({ query: $scope.searchString },
			   function(result){
			       $scope.meis = result;
			       console.log('search result...',result);
			   });
	     };
	     $scope.showImage = function(img) {
		 $scope.img = img;
		 ngDialog.open(
		     {template: 'meis/views/image_dialog.html',
		      className: 'ngdialog-theme-mei',
		      scope: $scope
		     }

		 );
/**		 
		 ngDialog.open({
		     template: '<p>my template</p>',
		     plain: true
		 });
*/
	     }
	 }
			 ]);
