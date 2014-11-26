'use strict';

angular.module('mean.meis').factory('Mm', ['$resource',
  function($resource) {
      return $resource('mm/:query', {
	  query : '@query'
    }, {
      search: {
          method: 'GET',
	  params:{

	      query:'@query'}, isArray:true
      }
    });
  }
]);
