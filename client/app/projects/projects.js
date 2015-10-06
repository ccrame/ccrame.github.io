module.exports = function($scope,appFactory,$state){
  $scope.selected = [1,0,0];

  $scope.selectProject = function(num){
    $scope.selected = [0,0,0];
    $scope.selected[num] = 1;
  };
};