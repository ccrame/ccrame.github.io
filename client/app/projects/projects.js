module.exports = function($scope,appFactory,$state){
  $scope.selected = 0;

  // project data
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


  // helper functions
  $scope.go = function(direction){
    if(direction === 'left' && $scope.selected > 0){
      $scope.selected--;
    } else if ( direction === 'right' && $scope.selected < $scope.project.title.length-1){
      $scope.selected++;
    }
  };
};