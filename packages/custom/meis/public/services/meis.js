'use strict';

// angular.module('mean.meis').factory('Meis', [
//   function() {
//     return {
//       name: 'meis'
//     };
//   }
// ]);
angular.module('mean.meis').factory('Meis', ['$resource',
  function($resource) {
    return $resource('meis/:meiId', {
      meisId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
