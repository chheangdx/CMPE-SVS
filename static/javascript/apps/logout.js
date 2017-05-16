var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('settingsCtrl',  ['$scope','$http', function($scope,$http) {

		$scope.passwordPattern = /^.{8,32}$/;
		$scope.cSamePass = "samePass";
		$scope.cSameEmail = "sameEmail";

		$scope.enterHandler = function($event) {
			if($scope.enableFields){
				if ($event.keycode === 13) {
					$scope.editAccountInformation();
					console.log("Enter event triggered");
				}
			}
			else{
				if ($event.keycode === 13) {
					$scope.edit();
					console.log("Enter event triggered");
				}
			}
		}

		$scope.editAccountInformation = function() {
			$scope.loadingIconOn = true;
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
	            	if(response.data.request){
						console.log("succ")
		                $scope.loadingIconOn = false;
		                $scope.errorArrive = false;
		                $scope.currentUser.email = $scope.savedEmail
	            	}
	            	else{
	            		console.log("fai")
		                $scope.loadingIconOn = false;
		                $scope.errorArrive = true;
		                $scope.currentUser.email = $scope.savedEmail
		                $scope.errorMessage = response.data.error;
	                	$scope.currentUser.oldPassword = "";
	            		$scope.currentUser.newPassword = "********";
	            		$scope.reconfirmedPass = ""
	            	}
	                
	            }, function errorCallback(response) {
	            	$scope.loadingIconOn = false;
            		$scope.errorArrive = true;
            		$scope.errorMessage = response.data.error;
            		$scope.currentUser.oldPassword = "";
            		$scope.currentUser.newPassword = "********";
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

		$scope.checker = function(var1, var2, bool) {
			console.log(var1);
			console.log(var2);
			if(bool == 'samePass') {
				console.log(bool);
				$scope.$samePass = (var1.localeCompare(var2) == 0);
				console.log($scope.$samePass);
			}
			if(bool == 'sameEmail') {
				console.log(bool);
				$scope.$sameEmail = (var1.localeCompare(var2) == 0);
				console.log($scope.$sameEmail);
			}
		}

	var init = function(){
		$scope.prefillValues()
		$scope.errorArrive = false;
		$scope.enableFields = false
		$scope.pwForm = false
		$scope.emailForm = false
		$scope.samePass = false
		$scope.loadingIconOn = false;
  	};

	init();

}]);