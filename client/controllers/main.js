var app = angular.module('testApp');


app.controller('mainCtrl', function($http , $scope ,$timeout ){
    $scope.messages =["first","second"];
    $scope.pictures =["first","second"];

   var action = new Consumer();
   var act = function() {
        $timeout(action.poll(), 1000);
    };     
     act();
   
    function Consumer() {
      var regexpBase64 = /^\s*(?:(?:[A-Za-z0-9+]{4})+\s*)*[A-Za-z0-9+]*={0,2}\s*$/;
      return{
      poll : function(data){
       $http.post('http://localhost:3000/api/form', data)
      .success(function (res ) {
        if ((res.length%4==0)&&(res.search(regexpBase64)!==-1)&&(res.length!==0)){
              $scope.pictures.push(res);
              console.log("pic:"+res);
          }else {
              $scope.messages.push(res);
              console.log("message:"+res);
          }
        })
      .error(function(error) {
       console.log(error);
              });
             /* angular.element('.name').addClass('afterSend');*/
   }
  };
  }

  function Presenter() {
      return{
         presentation : function(){
               return
         },
         lifetime : function(){
             return
         }
    }
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