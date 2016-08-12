// login check with email id

'use strict';

var emailCtrl = function($rootScope,$scope,$timeout,$state,user,Scopes) {
  
  //Save Scope of this controller inside Scopes factory
  Scopes.store('emailCtrl', $scope);

  //User object
  $scope.formData = {};

  //On Email form submit
  $scope.submit = function(valid){
    if(valid){
    	user.emailVerificaion($scope.formData,function(data) {
                    if(data){
                        $state.go('login');
                    }
                    else {
                    	$state.go('signup');
                    }
            },
            function(data){
                //error callback
            });
    }
  }  
}

cwrsApp.controller('emailCtrl', emailCtrl);