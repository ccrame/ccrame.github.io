module.exports = function($scope,appFactory,$state){
  $scope.selected = 0;
  $scope.showImageControls = false;


  /////////////////////
  // project data
  /////////////////////

  $scope.project = {};
  $scope.project.title = ['Linelevel','Political Profiler','Challenge Accepted!'];

  $scope.project.link = ['http://linelevel.herokuapp.com',
                         'https://politicalprofiler.herokuapp.com',
                         'https://heraapphrr7.herokuapp.com/#!/'];

  $scope.project.description = ['A social media app where artists can stream videos to their fans',
                                'A site that allows users to compare politicians\' voting histories',
                                'A web app where users can manage their daily tasks and share collections of tasks'];

  $scope.project.techStack = ['Angular.js, Firebase, Jasmine, WebRTC, Gulp.js',
                              'GovTrack API, Angular.js, Node.js/Express.js, Gulp.js, Jasmine, Bower',
                              'Angular.js, MongoDB/Mongoose, Node.js/Express.js, Grunt.js'];


  ////////////////////////////////////////////////////////////
  // helper function to scroll through projects on the screen
  ////////////////////////////////////////////////////////////
  $scope.switchProject = function(direction){
    if(direction === 'left' && $scope.selected > 0){
      $scope.selected--;
    } else if ( direction === 'right' && $scope.selected < $scope.project.title.length-1){
      $scope.selected++;
    }
  };

  ///////////////////////////////////////
  // helpers to hide/show image controls
  ///////////////////////////////////////

  // track the setTimeout
  var hideControlTimeout = null;

  var updateControlStatus = function(input){
    appFactory.update($scope,function(scope){
      scope.showImageControls = input;
    });
  };

  var hide = function(){
    updateControlStatus(false);
  };

  $scope.showControls = function(){
    clearTimeout(hideControlTimeout);
    updateControlStatus(true);
  };

  $scope.hideControls = function(){
    hideControlTimeout = setTimeout(hide,1000);
  };

  ////////////////////////////////////////////////
  // helpers to scroll through the project images
  ////////////////////////////////////////////////

  // shows the number of images per project
  $scope.imageCount = [4,4,3];
  $scope.imageScrollState = [0,0,0];

  $scope.scrollImage = function(direction){
    if(direction === 'left' && $scope.imageScrollState[$scope.selected] > 0){
      $scope.imageScrollState[$scope.selected]--;
    } else if (direction === 'right' && $scope.imageScrollState[$scope.selected] < $scope.imageCount[$scope.selected] - 1){
      $scope.imageScrollState[$scope.selected]++;
    }
  };




















};