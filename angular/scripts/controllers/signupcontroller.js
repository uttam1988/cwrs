// login check with email id

'use strict';

var signupCtrl = function($rootScope,$scope,$state,$timeout,Scopes,profile) {
 
  //User object
  $scope.formData = {};

  //Get and Set Email from emailCtrl from Scopes factory
  //$scope.formData.email = 'lkjas@asd.asd';
  $scope.formData.email = Scopes.get('emailCtrl').formData.email;

  //On User signs Up form submit
  $scope.submit = function(valid){
    if(valid){
    	//alert($scope.formData.email+"-"+$scope.formData.fname+"-"+$scope.formData.lname);
    	profile.signup($scope.formData,function(data) {
                    if(data){
                        $state.go('profile');
                    }
            },
            function(data){
                //error callback
      });
    }
  }  
}

cwrsApp.controller('signupCtrl', signupCtrl);