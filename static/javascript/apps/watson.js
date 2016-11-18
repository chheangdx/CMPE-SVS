var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('watsonCtrl',  ['$scope','$http', '$sce', function($scope,$http,$sce) {
	
	$scope.query = {queryIn :"Please enter your question here!"};

    $scope.ask = function() {
		console.log("Button was clicked!" + $scope.query.queryIn);
		var data = {query:$scope.query.queryIn};
		$scope.status = "loading";
		$http({
			method: 'post',
			url: '/watsonq',
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