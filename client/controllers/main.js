var app = angular.module('testApp');


app.controller('mainCtrl', function($http , $scope ,$timeout ){
    $scope.message ={};
    
    var poll = function() {
        $timeout($scope.retrieveData, 1000);
    };     
   poll();

    $scope.retrieveData=function(data){
       $http.post('http://localhost:3000/', data)
      .success(function (resp ) {
        $scope.messages =data;
       console.log(resp);
      })
      .error(function(error) {
       console.log(error);
      });
              angular.element('.name').addClass('afterSend');

    };
    
});

app.directive('chart', function() {
    return {
        restrict: 'A',
        scope : {
            value : '='  // '=' indicates 2 way binding
        },
        template : "<div> value : {{value}} </div>"
    };
});