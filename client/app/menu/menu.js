'use strict';
app
.controller('MenuCtrl', function($scope, $window, ngDialog, Auth, $location) {

  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.getCurrentUser = Auth.getCurrentUser;

  $scope.logout = function() {
    Auth.logout();
    $location.path('/');
  };

  $scope.loginOauth = function(provider) {
    $window.location.href = '/auth/' + provider;
  };

 /**
  * NGMODAL
  */
  $scope.openDialog = function () {
    //controller: 'InsideCtrl',
     var new_dialog = ngDialog.open({
       template: 'firstDialogId',
       className: 'ngdialog-theme-plain custom-width',
        data: {foo: 'some data'}
      });
       // example on checking whether created `new_dialog` is open
       /*$timeout(function() {
           console.log(ngDialog.isOpen(new_dialog.id));
       }, 2000)*/
     };

});
