module.exports = function($scope,appFactory){
  var samples = appFactory.firebase.child('sample');
  $scope.samples = {};

  samples.on('value',function(articles){
    articles = articles.val();
    samples.off();
    for(var article in articles){
      appFactory.update($scope,function(scope){
        scope.samples[articles[article]] = true;
      });
    }
  });
};