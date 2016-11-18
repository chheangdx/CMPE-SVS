var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('logoutCtrl',  ['$scope','$http', function($scope,$http) {

		$scope.contort = function(){
    	console.log("logout");
   		 };

        $scope.status = "idle";

		$scope.test = function() {
		console.log("Button was clicked!");
		var data = {};
		$scope.status = "loading";
		$http({
			method: 'get',
			url: '/testmyrequest',
			data: data
			}).then(function successCallback(response) {
				//successfully got a response
				console.log(response);
				$scope.status = "idle";
			}, function errorCallback(response) {
				//usually happens when an exception is thrown
				console.error(response);
				$scope.status = "failed";
			});
	};

}]);