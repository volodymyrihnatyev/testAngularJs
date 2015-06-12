var app = angular.module('testApp');


app.controller('mainCtrl', function($http , $scope ,$interval,$timeout ){
    $scope.messages =["first","second"];//static data
    $scope.pictures =["TWFyeSBoYWQgYSBsaXR0bGUgbGFtYi4uLiBASktMTU5PUFpbXF1eX2BhamtsbW5ven1+","second"];//static data
    $scope.point=[];//for checking type of message
    $scope.currentData =[];//value of message
    $scope.Data;


   var action = new Presenter();//Create Presenter object
   var act = function() {
        $interval(action.presentation(), 1000);//refresh data from server every 1second
        action.remove(3000);//remove data from DOM element with id 'current_message' every 1 second
    };     

     act();//run function act()

    function Consumer() {
      regexpBase64 = /^\s*(?:(?:[A-Za-z0-9+]{4})+\s*)*[A-Za-z0-9+]*={0,2}\s*$/;
      this.poll = function(data){
       $http.post('http://localhost:3000/api/form', data)
      .success(function (res ) {
        if ((res.length%4==0)&&(res.search(regexpBase64)!==-1)&&(res.length!==0)){//checking message for being Base64 encoded
              $scope.pictures.push(res);
              $scope.currentData.push(res);
              $scope.point.push(0);
          }else {
              $scope.messages.push(res);
              $scope.currentData.push(res);
              $scope.point.push(1);
          }
        })
      .error(function(error) {
       console.log(error);
              });
             /* angular.element('.name').addClass('afterSend');*/
   }
 }
  
  function Presenter() {
          $scope.consumer = new Consumer();
          this.presentation = function(){
            $scope.consumer.poll();//poll data from server
            $timeout(function(){
            if ($scope.point.pop() == 1){   
               //checking type of message in case point==1 -plain text
              var myEl = angular.element( document.querySelector( '#current_message' ) );
              $scope.Data =$scope.currentData[0];
              $scope.currentData.pop();
                myEl.append('<p>{{Data}}</p>');
             }else 
             if ($scope.point.pop() == 0){//in case point==0  -encoded base64 string
              var myEl = angular.element( document.querySelector( '#current_message' ) );
              $scope.Data =$scope.currentData[0];
              $scope.currentData.pop();
               myEl.append('<img src="data:image/png;base64,{{Data}}" alt="base64 picture">');
             }
           },1000);
         };
         //method remove message from element with id '#current_message' every time miliseconds
          this.remove = function(time){
            var myEl = angular.element( document.querySelector( '#current_message' ) );
            $interval(function(){myEl.children().remove()},time);
         };
    }
});

