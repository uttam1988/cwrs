'use strict';

cwrsApp.factory('user', function ($q,$timeout,$filter,$rootScope) {

	var User = {
		emailVerificaion: function(data,successCallBack, errorCallBack) {
            var deferred = $q.defer();
            var static_obj = null;
            var promise = deferred.promise;

            $timeout(function(){
                //Check the entered email in the backend and in response send email exits or not if exists send true
                
                if(data.email == 'valid@email.com'){
                    static_obj = true;
                }else{
                    static_obj = false;
                }

                promise.then(successCallBack(static_obj))
            }, 30);
        },

        login: function(data,successCallBack, errorCallBack) {
            var deferred = $q.defer();
            var static_obj = null;
            var promise = deferred.promise;

            $timeout(function(){
                //Check the entered email in the backend and in response send email exits or not if exists send true
                
                if(data.email == 'valid@email.com' && data.password == 'admin'){
                    static_obj = true;
                }else{
                    static_obj = false;
                }

                promise.then(successCallBack(static_obj))
            }, 30);
        }

	}
	return User;
});



