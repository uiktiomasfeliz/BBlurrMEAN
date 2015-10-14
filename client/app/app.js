'use strict';

var app = angular.module('bblurrApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'oc.lazyLoad',
  'slick',
  'infinite-scroll',
  'snapscroll',
  'ngDialog'

]);
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  /* */
    $urlRouterProvider
      .otherwise('/');


  $urlRouterProvider.when('', '/');

  $stateProvider
    /*.state('index', {
      url: '/',
      templateUrl: 'index/index.html',
      controller: 'IndexCtrl'
    })*/
    .state('main', {
      url: '',
      templateUrl: 'app/main/main.tpl.html'
    })
    .state('main.home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl'
    })
    .state('main.profile', {
      url: '/profile',
      templateUrl: 'app/profile/profile.html',
      controller: 'profileCtrl'
    });


    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/');
        }
      });
    });
  });
