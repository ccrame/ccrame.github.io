module.exports = function($scope, appFactory, $state, $stateParams){
  var articlesRef = appFactory.firebase.child('articles');
  var commentRef = appFactory.firebase.child('comments');
  $scope.articleData = null;
  $scope.articles = [];
  $scope.comments = null;
  $scope.showComments = false;
  $scope.articleMessage = "Blog Posts";

  if($stateParams.article){
    var article = articlesRef.child($stateParams.article);
    var comments = commentRef.child($stateParams.article);

    // load article contents
    article.on("value",function(receivedArticleInfo){
      receivedArticleInfo = receivedArticleInfo.val();
      article.off();
      appFactory.update($scope,function(scope){
        scope.articleData = receivedArticleInfo;
        scope.articleData.date = 'Published on ' + new Date(receivedArticleInfo.date).toDateString();
        scope.articleMessage = "More Blog Posts";
      });
    });

    // load article comments
    comments.on("value", function(commentData){
      $scope.comments = [];
      commentData = commentData.val() || {};
      comments.off();
      var keys = Object.keys(commentData);
      for(var i = keys.length; i >= 0; --i){
        $scope.comments.push(commentData[keys[i]]);
      }
    });
  }


  // load list of articles
  articlesRef.on('value',function(articles){
    articles = articles.val() || {};
    articlesRef.off();
    var keys = Object.keys(articles);
    for(var i = keys.length - 1; i >= 0; --i){
      appFactory.update($scope,function(scope){
        articles[keys[i]].key = keys[i];
        scope.articles.push(articles[keys[i]]);
      });
    }
  });

  $scope.postComment = function(){
    window.console.log('hello');
  };

  $scope.loadComments = function(){
    $scope.showComments = true;
  };


};