module.exports = function($scope, appFactory, $state, $stateParams){

  $scope.recents = {};

  $scope.homeTab = [1,0];

  $scope.selectHomeTab = function(num){
    $scope.homeTab = [0,0];
    $scope.homeTab[num] = 1;
  };

  //initialize
  (function(){
    var recents = appFactory.firebase.child("articles");
    recents.on("value",function(item){
      item = item.val();
      recents.off();
      appFactory.update($scope,function(scope){
        var count = 0;
        var keys = Object.keys(item);
        for(var i = keys.length - 1; i >= 0; --i){
          scope.recents[keys[i]] = item[keys[i]];
          if(++count >= 5){
            break;
          }
        }
      });
    });
  })();

};