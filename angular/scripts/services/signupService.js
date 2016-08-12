'use strict';

cwrsApp.factory('profile', function ($q,$timeout,$filter,$rootScope) {

	var Profile = {
		 signup: function(data,successCallBack, errorCallBack) {
            var deferred = $q.defer();
            var static_obj = null;
            var promise = deferred.promise;

            $timeout(function(){
                //Get details of user and store in in db and return a success with true/false.
                //Json Data formate
               /* {
                    data.email:'email@email.com',
                    data.fname:'Uttam',
                    data.lname:'rapeti'
                }*/

                static_obj = true;

                promise.then(successCallBack(static_obj))
            }, 30);
        },

        profile: function(data,successCallBack, errorCallBack) {
            var deferred = $q.defer();
            var static_obj = null;
            var promise = deferred.promise;

            $timeout(function(){
                //Get details of user and store in in db and return a success with true/false.
                //Json Data formate
               /* {
                    data.picture.name:'picture.png',/data.picture.type:'image/png',
                    data.live:'live',
                    data.travel:'travel',
                    data.specialize:'specialize',
                    data.rate:'rate'
                }*/

                static_obj = true;

                promise.then(successCallBack(static_obj))
            }, 30);
        },

        workrequirment: function(data,successCallBack, errorCallBack) {
            var deferred = $q.defer();
            var static_obj = null;
            var promise = deferred.promise;

            $timeout(function(){
                //Get details of user and store in in db and return a success with true/false.
                //Json Data formate
               /* {
                    data.companyname:'meetme',
                    data.position:'position',
                    data.timeworked:'timeworked',
                    data.skills:['angularjs','jquery','bootstrap'],
                    data.referencename:'sushant',
                    data.referenceemail:'sushant@gmail.com'
                }*/

                static_obj = true;

                promise.then(successCallBack(static_obj))
            }, 30);
        },

        education: function(data,successCallBack, errorCallBack) {
            var deferred = $q.defer();
            var static_obj = null;
            var promise = deferred.promise;

            $timeout(function(){
                //Get details of user and store in in db and return a success with true/false.
                //Json Data formate
               /* {
                    data.schoolname:'schoolname',
                    data.study:'study',
                    data.graduation:'graduation'
                }*/

                static_obj = true;

                promise.then(successCallBack(static_obj))
            }, 30);
        },

        getUser: function(successCallBack, errorCallBack) {
            var deferred = $q.defer();
            var static_obj = null;
            var promise = deferred.promise;

            $timeout(function(){
                //Entire User information is get in this call as GET
                //Json Data formate
               var data =  {
                    email:'uttam@gmail.com',
                    name: 'Uttam Kumar',
                    picture:'Penguins.jpg',
                    live:'Melbourne',
                    specialize:'Web Devloper',
                    workexperience:{
                        companyname : 'Google',
                        position : 'Senior Consultant',
                        skills : ['Angularjs','Javascript','Jquery','HTML5']
                    },
                    education:{
                        schoolname : 'Sydney Univercity',
                        study : 'Masters in computers',
                        graduation : '2012'
                    },
                }

                static_obj = data;

                promise.then(successCallBack(static_obj))
            }, 30);
        }

	}
	return Profile;
});



