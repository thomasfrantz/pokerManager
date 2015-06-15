var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
	$routeProvider
		.when('/home', {templateUrl:'templates/home.html', controller:'homeCtrl'})
		.when('/games', {templateUrl:'templates/games.html', controller:'gamesCtrl'})
		.when('/games/:id', {templateUrl:'templates/games.html', controller:'gamesCtrl'})
		.otherwise({redirectTo: '/home'});
	
	$locationProvider.html5Mode(true);
}]);