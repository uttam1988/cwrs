// login check with email id

'use strict';

var backgroundCtrl = function($rootScope,$scope,$timeout,$state,profile,Scopes,$uibModal) {
  

  //Add Work Experience
  $scope.addWorkExperience = function(){
    $state.go('workexperience');
  } 

  //Add Educational Qualifications
  $scope.addEducations = function(){
    $state.go('education');
  } 

  //Add Refer Friend
  $scope.addFriend = function(){
    //$state.go('referfriend');
    $uibModal.open({
      animation: true,
      templateUrl: 'angular/views/modal.html',
      controller: 'ModalInstanceCtrl',
      size: 'sm'
    });
  }  

  //Code for Work Experience 

    //Skills Drop down
    $scope.skills = [
      {name:'Angularjs',value:'1'},
      {name:'Bootstrap',value:'2'},
      {name:'Javascript',value:'3'},
      {name:'Jquery',value:'4'},
      {name:'HTML5',value:'5'},
      {name:'CSS3',value:'6'}
    ];

    //On change Skills push selected skills in to array and display in view
    $scope.havingskills = [];
    $scope.getTheSkill = function(skill){
        $scope.havingskills.push(skill);
    }

  //On Adding workexperience form submit
  $scope.submitwork = function(valid){
    if(valid){
      profile.workrequirment($scope.formData,function(data) {
                    if(data){
                        $state.go('education');
                    }
            },
            function(data){
                //error callback
      });
    }
  }

  //Ends

  //Code for Education Experience 

  //On Adding Educations form submit
  $scope.submiteducation = function(valid){
    if(valid){
      profile.education($scope.formData,function(data) {
                    if(data){
                        $state.go('dashboard');
                    }
            },
            function(data){
                //error callback
      });
    }
  }

  //Ends
}

cwrsApp.controller('backgroundCtrl', backgroundCtrl);

cwrsApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
});