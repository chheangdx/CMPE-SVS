var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('testerCtrl',  ['$scope','$http', '$sce', function($scope,$http,$sce) {
		$scope.testBody = "Please test a request....";
		$scope.test = function() {
			console.log("Button was clicked!");
			var data = {};
			$http({
					method: 'post',
					url: '/testmyrequest',
					data: data
				}).then(function successCallback(response) {
					//successfully got a response
					console.log(response);
					$scope.testBody = response.data;
				}, function errorCallback(response) {
					//usually happens when an exception is thrown
					console.error(response);
					$scope.testBody = "Request Failed";
				});
		};
}]);