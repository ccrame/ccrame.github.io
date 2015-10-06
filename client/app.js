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
  $scope.show = false;

  $scope.openMobileNav = function(){
    $scope.show = !$scope.show;
  };

  $scope.redirect = function(loc,num,stateParams){
    $scope.selected = [0,0,0,0];
    $scope.selected[num] = 1;
    $state.go(loc,stateParams);
  };

  $scope.visible = false;

  $scope.toggleVisibility = function(){
    $scope.visible = !$scope.visible;
  };

  $scope.selected = [0,0,0,0];

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

  $scope.$watch(function(){return $state.current.name;},function(){
    init();
  });

  init();
}]);