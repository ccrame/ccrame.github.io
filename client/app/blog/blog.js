module.exports = function($scope, appFactory, $state, auth, $stateParams){
  var articlesRef = appFactory.firebase.child('articles');
  var commentRef = appFactory.firebase.child('comments');
  $scope.articleData = null;
  $scope.articles = [];
  $scope.comments = [];
  $scope.comment = {};
  $scope.showComments = false;
  $scope.hideComments = false;
  $scope.loadingAnimation = true;
  $scope.articleMessage = "Blog Posts";

  if($stateParams.article){
    var article = articlesRef.child($stateParams.article);
    var comments = appFactory.articleComments = commentRef.child($stateParams.article);

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



  // article comment helpers
  $scope.postComment = function(){
    //exit if invalid comment
    if(!$scope.userProfile){$scope.signIn(); return;}
    if(!$scope.comment.text){return;}
    if(!$scope.comment.text.length){return;}

    //get link to user profile
    var link = null;
    if($scope.userProfile.link){link = $scope.userProfile.link}
    else if ($scope.userProfile.screen_name){link = "https://twitter.com/" + $scope.userProfile.screen_name;}
    else { link = "https://plus.google.com/" + $scope.userProfile.user_id.split('|')[1];}

    //post comment to db
    appFactory.articleComments.push().set({
      text : $scope.comment.text,
      time : (new Date()).getTime(),
      picture : $scope.userProfile.picture,
      name: $scope.userProfile.name,
      email: $scope.userProfile.email || $scope.userProfile.screen_name + '@twitter.com',
      link: link

    });

    //clear previous comment
    appFactory.update($scope,function(scope){
      scope.comment = {};
    });
  };



  var wrapper = function(){
    appFactory.update($scope,function(scope){
      scope.loadingAnimation = false;
    });
  };

  $scope.loadComments = function(){
    $scope.showComments = true;
    
    // load article comments
    comments.on("child_added", function(commentData){
      appFactory.update($scope, function(scope){
        scope.comments.push(commentData.val());
      });
    });

    setTimeout(wrapper,1000);
  };

  $scope.toggleComments = function(){
    $scope.hideComments = !$scope.hideComments;
  };

  $scope.checkAuth = function(){
    if(!auth.isAuthenticated){
      $scope.signIn();
    }
  };


};