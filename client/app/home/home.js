module.exports = function($scope,appFactory){
  $scope.recents = {};

  //initialize
  (function(){
    var recents = appFactory.firebase.child("sample");
    recents.on("value",function(item){
      item = item.val();
      recents.off();
      appFactory.update($scope,function(scope){
        for(var key in item){
          console.log("key is ", key);
          scope.recents[key] = item[key];
        }
      });
    });
  })();

};