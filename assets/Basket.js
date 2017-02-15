(function(){
  'use strict';

  angular.module('Basket', []).controller('ScoreController', function($scope,$http){

    // For socket client explanation
    // See http://sailsjs.com/documentation/reference/web-sockets/socket-client

    io.socket.get('/match', function(data){
      console.log('get socket');
      $scope.match = data;
      $scope.$apply();
    });

    io.socket.on('match', function(event) {
      console.log(event);
      switch (event.verb) {
        case 'created':
          console.log('created');
          $scope.match = event.data;
          $scope.$apply();
          break;
        case 'updated':
          console.log('updated');
          $scope.match = event.data;
          $scope.$apply();
          break;
        default:
          console.log('nothing match');
          return;
      }
    });

  });

})();
