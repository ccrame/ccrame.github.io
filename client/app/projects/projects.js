module.exports = function($scope,appFactory,$state){
  $scope.selected = 0;
  $scope.projects = ['Linelevel','Political Profiler','Challenge Accepted!'];
  $scope.projectLinks = ['http://linelevel.herokuapp.com','https://politicalprofiler.herokuapp.com','https://heraapphrr7.herokuapp.com/#!/'];

  $scope.go = function(direction){
    if(direction === 'left' && $scope.selected > 0){
      $scope.selected--;
    } else if ( direction === 'right' && $scope.selected < $scope.projects.length-1){
      $scope.selected++;
    }
  };
};