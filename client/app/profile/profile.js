'use strict';

app.controller('profileCtrl', function($scope, Auth) {

  $scope.isEdit=false;

  $scope.showAlert = function(){
    alert("Hola");
  }

  $scope.troggleEdit = function(){
    //$scope.isEdit=true ? false : true;
    if($scope.isEdit){
        $scope.isEdit=false;
    }else{
      $scope.isEdit=true;
    }

  }

  //$scope.isLoggedIn = Auth.isLoggedIn;
  $scope.getCurrentUser = Auth.getCurrentUser;

  $scope.logout = function() {
    Auth.logout();
    $location.path('/');
  };

});
