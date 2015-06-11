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
      this.point =0;
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
         this.presentation = function(){
            var consumer = new Consumer();
            consumer.poll();
            if (consumer.point == 1){
               return angular.element('#current_message').append('consumer.currentData.data');
             }else{
              var arg=angular.element();
              return angular.element('#current_message').append('<img src="data:image/png;base64,{{consumer.currentData.data}}" alt="base64 picture">');
             };
         this.lifetime = function(){
             return false;
         }
    }
  };
    
});
