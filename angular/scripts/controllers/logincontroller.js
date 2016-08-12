// login check with email id

'use strict';

var loginCtrl = function($rootScope,$scope,$timeout,$state,Scopes,user) {
  

  //User object
  $scope.formData = {};
  $scope.message;

  //Get and Set Email from emailCtrl from Scopes factory
  //$scope.formData.email = 'invalid@email.com';
  $scope.formData.email = Scopes.get('emailCtrl').formData.email;


  //On Email form submit
  $scope.submit = function(valid){
    if(valid){
    	//alert($scope.formData.email);
    	user.login($scope.formData,function(data) {
                    if(data){
                        //alert("TRUEEEE -> "+data);
                        $scope.message = '';
                        $state.go('dashboard');
                    }
                    else {
                    	//alert("False -> "+data);
                      $scope.message = 'Email or Password are wrong please re-try.';
                    }
            },
            function(data){
                //error callback
            });
    }
  }  
}

cwrsApp.controller('loginCtrl', loginCtrl);