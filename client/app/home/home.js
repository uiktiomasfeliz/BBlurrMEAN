'use strict';

app
.controller('HomeCtrl', function($scope, homeService) {

  $scope.content = [];
  $scope.originContent = '';

  homeService.getContent().then(function(data) {
    $scope.originContent = data;
    $scope.content.push(data[0]);
    $scope.content.push(data[1]);
    $scope.content.push(data[2]);
  });

  $scope.loadMore = function() {
    $scope.content.push($scope.originContent[$scope.content.length]);
  };

});
