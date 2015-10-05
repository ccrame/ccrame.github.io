module.exports = function($scope, appFactory, $state, $stateParams){
  var articlesRef = appFactory.firebase.child('articles');
  $scope.samples = {};
  $scope.articleData = null;
  $scope.articleMessage = "Blog Posts"

  if($stateParams.article){
    var article = articlesRef.child($stateParams.article);

    article.on("value",function(info){
      info = info.val();
      article.off();
      appFactory.update($scope,function(scope){
        scope.articleData = info;
        scope.articleMessage = "More Blog Posts";
      });
    });
  }

  articlesRef.on('value',function(articles){
    articles = articles.val();
    articlesRef.off();
    var keys = Object.keys(articles);
    for(var i = keys.length - 1; i >= 0; --i){
      appFactory.update($scope,function(scope){
        scope.samples[keys[i]] = articles[keys[i]];
      });
    }
  });

};