var app = angular.module('helloworldApp', []);
app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});
app.controller('helloworldCtrl',  ['$scope','$http', '$sce', function($scope,$http,$sce) {
    $scope.hello = function() {
		console.log("Button was clicked!");
		var data = {"message": $scope.name};
		$http({
			method: 'post',
			url: '/helloworld/execute/',
			data: data
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.myContent = $sce.trustAsHtml(response.data);
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	};
}]);