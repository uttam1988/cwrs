// login check with email id

'use strict';

var profileCtrl = function($rootScope,$scope,$timeout,$state,profile,Scopes) {
  

  //User object
  $scope.formData = {};

  //On Email form submit
  $scope.submit = function(valid){
    if(valid){
    	//alert($scope.formData.picture);
    	profile.profile($scope.formData,function(data) {
                    if(data){
                        //alert( data.picture.type+'--'+data.live+'--'+data.travel+'--'+data.specialize+'--'+data.rate);
                        $state.go('background');
                    }
            },
            function(data){
                //error callback
            });
    }
  }  
}

cwrsApp.controller('profileCtrl', profileCtrl);