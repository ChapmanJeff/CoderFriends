var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/templates/login.html',
		})
		.when('/home', {
			templateUrl: '/templates/home.html', 
			controller: 'homeCtrl',
			resolve: {
				friends: function (githubService) {
					return githubService.getFollowing();
				}
			}
		})
		.when('/friend/:github_username', {
			templateUrl: '/templates/friend.html',
			resolve: {
				gitFriend: function ($route, githubService) {
					return githubService.getFriend($route.current.params.github_username);
				}
			}
		})
		.otherwise('/');
})

app.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.interceptors.push('myHttpInterceptor');
});

// register the interceptor as a service
app.factory('myHttpInterceptor', function($q) {
    return {
        // optional method
        'responseError': function(rejection) {
            if (rejection.status == 403) {
                document.location = '/';
                return;
            }
            return $q.reject(rejection);
        }
    };
});