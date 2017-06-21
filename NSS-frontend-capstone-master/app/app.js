"use strict";

var app = angular.module("stock_up", ["ngRoute"]);

// let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
//   // console.log("running isAuth");
//     AuthFactory.isAuthenticated()
//     .then ( (userExists) => {
//     console.log("userExists", userExists);
//         if (userExists){
//       console.log("Authenticated, go ahead.");
//             resolve();
//         }else {
//       console.log("Authentication rejected, go away.");
//             reject();
//         }
//     });
// });


app.config(function($routeProvider){
	$routeProvider.
	when('/', {
		templateUrl: '/partials/home.html',
		controller: "HomeCtrl",
	}).
	when('/profile', {
		templateUrl: '/partials/profile.html',
		controller: "ProfileCtrl",
	}).
	otherwise('/');
});


app.config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  }
]);

