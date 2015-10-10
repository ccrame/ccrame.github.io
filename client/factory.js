var Firebase = require('client-firebase');
module.exports = function(){
  var obj = {};

  // reusable update function via $scope.$apply
  obj.update = function(scope,cb){
    if(!scope.$$phase){
      scope.$apply(function(){
        cb.call(this,scope);
      });
    } else {
      cb.call(this,scope);
    }
  };

  obj.profile = null;

  obj._2 = "kwwsv=22surmwhvwlqj1iluhedvhlr1frp";
  obj._1 = function(a){
    return a.replace(/./g,function(a){return String.fromCharCode(a.charCodeAt(0)-3);});
  };

  obj.firebase = new Firebase(obj._1(obj._2));

  return obj;
};