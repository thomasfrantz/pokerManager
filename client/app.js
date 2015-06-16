var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
	$routeProvider
		.when('/home', {template:tpl_home(), controller:'homeCtrl'})
		.when('/games', {template:tpl_games(), controller:'gamesCtrl'})
		.when('/games/:id', {template:tpl_games(), controller:'gamesCtrl'})
		.otherwise({redirectTo: '/home'});
	
	$locationProvider.html5Mode(true);
}]);