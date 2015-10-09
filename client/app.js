var angular        = require('angular'),
blogController     = require('./app/blog/blog.js'),
homeController     = require('./app/home/home.js'),
projectsController = require('./app/projects/projects.js'),
aboutController    = require('./app/about/about.js');

var app = angular.module('main',[require('angular-ui-router')])

//CONFIG
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
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
}])


//RUN
.run(['$state',function($state){
  $state.transitionTo('home');
}])

//FACTORY
.factory('appFactory',require('./factory.js'))

//CONTROLLER
.controller('mainController',['$scope','$state','$location','appFactory',function($scope, $state, $location, appFactory){

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
  // $scope.signin = function(provider){
  //   OAuth.popup(provider, {cache: true})
  //     .then(function(res){
  //       res.email = provider + res.id + '@site.com';
  //       return User.signin(res);
  //     })
  //     .done(function(user){
  //       console.log('user is ', user);
  //       console.log('login success');
  //     })
  //     .fail(function(err){
  //       console.log(err);
  //       console.log('signup user');
  //     })
  // };

  // $scope.unauth = function(){
  //   OAuth.clearCache();
  //   User.getIdentity().logout(function(){
  //     console.log('user logged out');
  //   })
  // };
















}]);