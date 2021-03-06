/*Camper News removed the user comments section of its articles, 
and any code related to user comments has been commented out */

var app = angular.module('app', []);

app.controller('appCtrl', ['$http', '$scope', function($http, $scope) {
  //api url
  var url = 'http://www.freecodecamp.com/stories/hotStories';
  
  //initializing blank array for stories
  $scope.stories = [];
  
  //sorting options
  $scope.sortBy = 'title';
  $scope.reversed = false;
  $scope.sortReverse = function(){
    if ($scope.reversed){
      $scope.reversed = false;
    } else {
      $scope.reversed = true;
    }
  }
  $scope.byTitle = function(){
    $scope.sortBy = 'title';
  }
  $scope.byUpvotes = function(){
      $scope.sortBy = '-upvotes';
  }
  //$scope.byComments = function(){
  //  $scope.sortBy = '-comments';
  //}
  $scope.clickStory = function(){
    $(this).find('.defaultHidden').show();
  }
  
  //functions to populate story divs (getting links, counting numbers of comments, etc)
  
  //$scope.findComments = function(article) {
  //  var count = 0;
  //  article.comments.forEach(function(comment) {
  //    count++;
  //  })
  //  return count;
  //}
  $scope.shortenHeadline = function (headline){
    if (headline.length >= 45){
      var shortHeadline = headline.slice(0,45) + '...';
      return shortHeadline;
    } else {
      return headline;
    }
  }
  $scope.createDiscussLink = function(article){
    var link = article.storyLink.split(' ').join('-');
    return link;
  }
  $scope.findImage = function(article) {
    if (article.image === "") {
      return article.author.picture;
    } else {
      return article.image;
    }
  }
  
  //api call and pushing story to array
  $http.get(url).success(function(data) {
    data.forEach(function(article) {
      var story = {};
      story.title = $scope.shortenHeadline(article.headline);
      story.mouseOver = article.headline;
      story.link = article.link;
      story.discussLink = 'http://www.freecodecamp.com/news/' + $scope.createDiscussLink(article);
      /*story.comments = $scope.findComments(article);*/
      story.image = $scope.findImage(article);
      story.poster = article.author.username;
      story.upvotes = article.upVotes.length;
      $scope.stories.push(story);
    });
  });
}])
