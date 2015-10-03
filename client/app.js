var angular = require('angular');
var app = angular.module('main',[require('angular-ui-router')])

//CONFIG
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './app/home/home.html',
    })
    .state('projects', {
      url: '/projects',
      templateUrl: './app/projects/projects.html',
    })
    .state('about',{
      url: '/about',
      templateUrl: './app/about/about.html'
    })
    .state('blog',{
      url: '/blog',
      templateUrl: './app/blog/blog.html'
    })
}])


//RUN
.run(['$state',function($state){
  $state.transitionTo('home');
}])


//CONTROLLER
.controller('mainController',['$scope','$state', '$location',function($scope, $state, $location){

  $scope.redirect = function(loc,num){
    $scope.selected = [0,0,0,0];
    $scope.selected[num] = 1;
    $state.go(loc,{loc: 'testing'});
  };

  $scope.visible = false;

  $scope.toggleVisibility = function(){
    $scope.visible = !$scope.visible;
  };

  $scope.selected = [1,0,0,0];

  $state.go('home');

}]);