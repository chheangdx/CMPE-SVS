var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('settingsCtrl',  ['$scope','$http', function($scope,$http) {

		$scope.enterHandler = function($event) {
			if ($event.keycode === 13) {
				$scope.editAccountInformation();
				console.log("Enter event triggered");
			}
		}

		$scope.editAccountInformation = function() {
			$scope.savedEmail = $scope.currentUser.email
			var data = {
				user:$scope.currentUser
			}


			console.log(data)
			$http({
	                method: 'post',
	                url: '/editAccountInformation',
	                data: data
	            }).then(function successCallback(response) {
	                console.log("succ")
	                $scope.errorArrived = false;
	                $scope.currentUser.email = $scope.savedEmail
	            }, function errorCallback(response) {
	            	if(response.id == 1)
	            		$scope.errorArrived = true;
	            		$scope.errorMessage = response.error;
	            		$scope.currentUser.oldPassword = "";
	            		$scope.currentUser.newPassword = "";
	            		$scope.reconfirmedPass = ""
	            });
		}

		$scope.prefillValues = function(){
			var data = {}
	        $http({
	                method: 'post',
	                url: '/getAccountInformation',
	                data: data
	            }).then(function successCallback(response) {
	                $scope.currentUser = response.data
	                $scope.oldEmail = $scope.currentUser.email
	                $scope.currentUser.newPassword = '********'

	                $scope.currentUser.oldPassword = ""
	            }, function errorCallback(response) {
	            
	            });
		}

		$scope.edit = function() {
			$scope.enableFields = !$scope.enableFields;
		}

		$scope.pwchecker = function() {
			if($scope.userInput.reconfirmedPass.$dirty)
				$scope.samePass = ($scope.reconfirmedPass.localeCompare($scope.currentUser.newPassword) == 0)
		}

		$scope.emailPattern = '/^.+@.+\\..+$/';

	var init = function(){
		$scope.prefillValues()
		$scope.enableFields = false
		$scope.pwForm = false
		$scope.emailForm = false
		$scope.samePass = false
  	};

	init();

}]);