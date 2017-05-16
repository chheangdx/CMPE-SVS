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
		$scope.loadingIconOn = true;
		$http({
			method: 'post',
			url: '/watsonq',
			data: data
			}).then(function successCallback(response) {
				//successfully got a response
				$scope.loadingIconOn = false;
				console.log(response.data[0]);
				if(typeof response.data[0] == "undefined"){
					$scope.resultsGot = false;
					$scope.noAnswers = true;
				}
				else{
					$scope.resultsGot = true;
					$scope.answers = response.data;
					$scope.noAnswers = false;
				}
				
			}, function errorCallback(response) {
				//usually happens when an exception is thrown
				$scope.loadingIconOn = false;
				console.error(response);
			});
	};

	$scope.enterHandler = function($event) {
      if ($event.keycode === 13) {
        $scope.ask();
        console.log("Enter event triggered");
      }
    }

	var init = function() {
		$scope.resultsGot = false;
		$scope.noAnswers = false;
		$scope.loadingIconOn = false;
	}

	init()

}]);