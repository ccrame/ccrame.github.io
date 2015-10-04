var angular = require('angular');
var blogController = require('./app/blog/blog.js');
var homeController= require('./app/home/home.js');
var app = angular.module('main',[require('angular-ui-router')])


//CONFIG
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './app/home/home.html',
      controller: homeController
    })
    .state('projects', {
      url: '/projects',
      templateUrl: './app/projects/projects.html'
    })
    .state('about',{
      url: '/about',
      templateUrl: './app/about/about.html'
    })
    .state('blog',{
      url: '/blog',
      templateUrl: './app/blog/blog.html',
      controller: blogController
    })
}])


//RUN
.run(['$state',function($state){
  $state.transitionTo('home');
}])

//FACTORY
.factory('appFactory',require('./factory.js'))

//CONTROLLER
.controller('mainController',['$scope','$state','$location','appFactory',function($scope, $state, $location, appFactory){
  $scope.show = false;

  $scope.openMobileNav = function(){
    $scope.show = !$scope.show;
  };

  $scope.redirect = function(loc,num){
    $scope.selected = [0,0,0,0];
    $scope.selected[num] = 1;
    $state.go(loc,{loc: 'testing'});
  };

  $scope.visible = false;

  $scope.toggleVisibility = function(){
    $scope.visible = !$scope.visible;
  };

  $scope.selected = [0,0,0,0];
  
  var init = function(){
    switch($state.current.name){
      case "home":     $scope.selected[0] = 1; break;
      case "blog":     $scope.selected[1] = 1; break;
      case "projects": $scope.selected[2] = 1; break;
      case "about":    $scope.selected[3] = 1; break;
      default:         setTimeout(init,50);
    };//end of switch
  };

  init();
}]);