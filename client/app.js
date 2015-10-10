var angular        = require('angular'),
blogController     = require('./app/blog/blog.js'),
homeController     = require('./app/home/home.js'),
projectsController = require('./app/projects/projects.js'),
aboutController    = require('./app/about/about.js');




var AUTH0 = require('./app/auth0/auth0-variables.js');

var app = angular.module('main',['auth0',require('angular-ui-router'),require('angular-jwt'),require('angular-storage')])

//CONFIG
.config(['$stateProvider','$urlRouterProvider','authProvider', 'jwtInterceptorProvider',function($stateProvider,$urlRouterProvider, authProvider, jwtInterceptorProvider){
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'client/app/home/home.html',
      controller: homeController
    })
    .state('projects', {
      url: '/projects',
      templateUrl: 'client/app/projects/projects.html',
      controller: projectsController
    })
    .state('about',{
      url: '/about',
      templateUrl: 'client/app/about/about.html',
      controller: aboutController
    })
    .state('blog',{
      url: '/blog',
      templateUrl: 'client/app/blog/blog.html',
      controller: blogController
    })
    .state('article',{
      url:'/blog/:article',
      templateUrl: 'client/app/blog/blog.html',
      controller: blogController
    });

    authProvider.init({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID
    });
    
    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('token');
    };
}])


//RUN
.run(['$state', 'auth', 'store', 'jwtHelper','appFactory',function($state, auth, store, jwtHelper, appFactory){
  $state.transitionTo('home');

  if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
          appFactory.profile = store.get('profile');
        } else {
          store.remove('token');
          store.remove('profile');
        }
      }
    }
}])

//FACTORY
.factory('appFactory',require('./factory.js'))

//CONTROLLER
.controller('mainController',['$scope','$state','$location','appFactory','auth','store',function($scope, $state, $location, appFactory, auth, store){

  // OAuth.initialize('mLzdeuffodwWIehTFLH-g_8DmxI');

  $scope.show = false;
  $scope.contactMessage = "Contact";
  $scope.visible = false;
  $scope.selected = [0,0,0,0];
  // window.console.log('oauth is ', OAuth);

  /********************
    Navigation Bar 
  *********************/
  // Open navigation menu on mobile version
  $scope.openMobileNav = function(){
    $scope.show = !$scope.show;
  };

  $scope.redirect = function(loc,num,stateParams){
    $scope.selected = [0,0,0,0];
    $scope.selected[num] = 1;
    $state.go(loc,stateParams);
  };

  var init = function(){
    $scope.selected = [0,0,0,0];
    switch($state.current.name){
      case "home":     $scope.selected[0] = 1; break;
      case "blog": 
      case "article":    $scope.selected[1] = 1; break;
      case "projects": $scope.selected[2] = 1; break;
      case "about":    $scope.selected[3] = 1; break;
      default:         setTimeout(init,50);
    };//end of switch
  };

  // re-initialize when a state becomes present
  $scope.$watch(function(){return $state.current.name;},function(){
    init();
  });

  // initialize page on load
  init();


  /********************
    Contacts Side Panel
  *********************/
  $scope.toggleVisibility = function(){
    $scope.visible = !$scope.visible;
    if($scope.visible) {$scope.contactMessage = "Close";}
    else {$scope.contactMessage = "Contact";}
  };


  /********************
    Authentication
  *********************/
  window.test = function(){
    console.log('profile: ',appFactory.profile);
    console.log('authenticated: ', auth.isAuthenticated);
  };

  $scope.login = function() {
    auth.signin({}, function(profile, token) {
      console.log('profile is ',profile);
      store.set('profile', profile);
      store.set('token', token);
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }

  $scope.logout = function() {
    appFactory.profile = null;
    auth.signout();
    store.remove('profile');
    store.remove('token');
  }


}]);