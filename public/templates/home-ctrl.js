var app = angular.module('app');

app.controller('homeCtrl', function($scope, friends) {

	$scope.friends = friends;
	console.log('hi');
	console.log($scope.friends)

	$scope.text = "Jeff";


});