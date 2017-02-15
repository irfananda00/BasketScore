(function(){
  'use strict';

  angular.module('Basket', []).controller('ScoreController', function($scope,$http){

    // $scope.getScore = function(){
    //   io.socket.get('/match/getSocket');
    //
    //   $http.get('/match').then(function(res){
    //     console.log(res.data);
    //     $scope.match = res.data;
    //   });
    // };
    //
    // $scope.getScore();

    io.socket.get('/match', function(data){
      console.log('get socket');
      $scope.match = data;
      $scope.$apply();
    });

    io.socket.on('Match', function(event){
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
