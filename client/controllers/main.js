var app = angular.module('testApp');


app.controller('mainCtrl', function($http , $scope ,$interval ){
    $scope.messages =["first","second"];
    $scope.pictures =["TWFyeSBoYWQgYSBsaXR0bGUgbGFtYi4uLiBASktMTU5PUFpbXF1eX2BhamtsbW5ven1+","second"];


   var action = new Presenter();//Create Presenter object
   var act = function() {
        $interval(action.presentation(), 1000);//poll data from server every 1second
        action.remove(1000);//remove data from DOM element with id 'current_message' every 1 second
    };     

     act();//run function act()

    function Consumer() {
      this.point;
      this.currentData ;
      regexpBase64 = /^\s*(?:(?:[A-Za-z0-9+]{4})+\s*)*[A-Za-z0-9+]*={0,2}\s*$/;
      this.poll = function(data){
       $http.post('http://localhost:3000/api/form', data)
      .success(function (res ) {
        if ((res.length%4==0)&&(res.search(regexpBase64)!==-1)&&(res.length!==0)){//checking message for being Base64 encoded
              $scope.pictures.push(res);
              console.log("pic:"+res);
              this.currentData= res;
              this.point=0;
              console.log("pic:"+this.point+this.currentData);
          }else {
              $scope.messages.push(res);
              console.log("message:"+res);
              this.currentData = res;
              this.point=1;
              console.log("pic:"+this.point+this.currentData);
          }
        })
      .error(function(error) {
       console.log(error);
              });
             /* angular.element('.name').addClass('afterSend');*/
   }
 }
  
  function Presenter() {
          consumer = new Consumer();
          this.presentation = function(){
            consumer.poll();
            alert(consumer.point);/*why undefined??*/
            if (consumer.point == 1){
              var myEl = angular.element( document.querySelector( '#current_message' ) );
               return  myEl.prepend('{{consumer.currentData}}');
             }else{
              var myEl = angular.element( document.querySelector( '#current_message' ) );
              return myEl.prepend('<img src="data:image/png;base64,{{consumer.currentData}}" alt="base64 picture">');
             }
         };
          this.remove = function(time){
            var myEl = angular.element( document.querySelector( '#current_message' ) );
            $interval(function(){myEl.children().remove()},time);
         };
    }
});

