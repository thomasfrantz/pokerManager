app.factory('gamesService', ['$http', '$rootScope', function($http, $rootScope) {
    return {
        search: function(scope, routeParams) {

		
            // We create the url to call
            var url = "/api/games/"
			url+= (routeParams.id) ? routeParams.id : "";
            return $http.get(url);

        }
    }
}]);