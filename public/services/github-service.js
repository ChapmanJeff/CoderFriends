var app = angular.module('app');

app.service('githubService', function ($http) {

	this.getFollowing = function () {
		return $http({
			method: 'GET',
			url: '/api/github/following'
		}).then(function(res) {
			return res.data;
		})
	};

});