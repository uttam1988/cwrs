// login check with email id

'use strict';

var dashboardCtrl = function($rootScope,$scope,$timeout,$state,Scopes,profile) {
  
$scope.user = {};

profile.getUser(function(data) {
                    if(data){
                        //alert("TRUEEEE -> "+data);
                        $scope.user = data;
                       //alert($scope.user.picture);
                    }
            },
            function(data){
                //error callback
            });

}

cwrsApp.controller('dashboardCtrl', dashboardCtrl);