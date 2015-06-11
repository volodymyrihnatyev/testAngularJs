var app = angular.module('testApp');


app.controller('mainCtrl', function($http , $scope ,$timeout ){
    $scope.messages =["first","second"];
    $scope.pictures =["first","second"];

   var action = new Presenter();
   var act = function() {
        $timeout(action.presentation(), 1000);
    };     
     act();
   
    function Consumer() {
      this.point;/*why undefined????*/
      var regexpBase64 = /^\s*(?:(?:[A-Za-z0-9+]{4})+\s*)*[A-Za-z0-9+]*={0,2}\s*$/;
      this.poll = function(data){
       $http.post('http://localhost:3000/api/form', data)
      .success(function (res ) {
        if ((res.length%4==0)&&(res.search(regexpBase64)!==-1)&&(res.length!==0)){
          this.point=0;
              $scope.pictures.push(res);
              console.log("pic:"+res);
          }else {
            this.point=1;
              $scope.messages.push(res);
              console.log("message:"+res);
          }
        })
      .error(function(error) {
       console.log(error);
              });
             /* angular.element('.name').addClass('afterSend');*/
   }
 }
  
  function Presenter() {
         return {
          presentation : function(){
            var consumer = new Consumer();
            consumer.poll();
            alert(consumer.point);/*why undefined??*/
            if (consumer.point == 1){
               return angular.element('#current_message').append('consumer.currentData.data');
             }else{
              var arg=angular.element();
              return /*angular.element('#current_message').append('<img src="data:image/png;base64,{{consumer.currentData.data}}" alt="base64 picture">');*/
             }
         },
         lifetime : function(){
             return false;
         }
       }
    }
    var pr = new Presenter();
   pr.presentation();
});