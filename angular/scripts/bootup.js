
//App for Signup
var cwrsApp = angular.module('cwrsApp', ['ui.bootstrap','ui.router','ngSanitize','ngResource','ngFileUpload']);

cwrsApp.config(function($stateProvider,$urlRouterProvider,$locationProvider) {
      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise("/user/email");

      // Now set up the states
      $stateProvider
       .state('email', {
          url: "/user/email",
          controller: "emailCtrl",
          templateUrl: "angular/views/email.html"
        })
       .state('signup', {
          url: "/user/signup",
          controller: "signupCtrl",
          templateUrl: "angular/views/signup.html"
        })
       .state('login', {
          url: "/user/login",
          controller: "loginCtrl",
          templateUrl: "angular/views/login.html"
        })
       .state('profile', {
          url: "/user/profile",
          controller: "profileCtrl",
          templateUrl: "angular/views/profile.html"
        })
       .state('background', {
          url: "/user/background",
          controller: "backgroundCtrl",
          templateUrl: "angular/views/background.html"
        })
       .state('workexperience', {
          url: "/user/workexperience",
          controller: "backgroundCtrl",
          templateUrl: "angular/views/workexperience.html"
        })
       .state('education', {
          url: "/user/education",
          controller: "backgroundCtrl",
          templateUrl: "angular/views/education.html"
        })
       .state('referfriend', {
          url: "/user/referfriend",
          controller: "backgroundCtrl",
          templateUrl: "angular/views/referfriend.html"
        })
       .state('dashboard', {
          url: "/user/dashboard",
          controller: "dashboardCtrl",
          templateUrl: "angular/views/dashboard.html"
        });
});
