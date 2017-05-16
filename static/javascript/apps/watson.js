var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('watsonCtrl',  ['$scope','$http','$sce', function($scope,$http,$sce) {
	$scope.trustAsHtml = $sce.trustAsHtml;
	$scope.query = {queryIn :""};

    $scope.ask = function() {
		console.log("Button was clicked, " + $scope.query.queryIn);
		var data = {'question':$scope.query.queryIn};
		$scope.status = "loading";
		$http({
			method: 'post',
			url: '/watsonq',
			data: data
			}).then(function successCallback(response) {
				//successfully got a response
				console.log(response);
				if(typeof response.data == "undefined"){
					$scope.resultsGot = false;
					$scope.noAnswers = true;
				}
				else{
					$scope.resultsGot = true;
					$scope.answers = response.data;
					$scope.status = "idle";
					$scope.noAnswers = false;
				}
				
			}, function errorCallback(response) {
				//usually happens when an exception is thrown
				console.error(response);
				$scope.status = "failed";
			});
	};

	var init = function() {
		$scope.resultsGot = false;
		$scope.noAnswers = false;
	}

	init()

}]);