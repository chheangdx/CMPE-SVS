var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('loginCtrl',  ['$scope','$http', function($scope,$http) {


    $scope.loginUser = function() {
        $scope.loadingIconOn = true;
        var data = {user:{
            username: $scope.username,
            password: $scope.password
            }};
        $http({
                    method: 'post',
                    data: data,
                    url:'/loginUser'
                }).then(function successCallback(response) {
                    $scope.loadingIconOn = false;
                  if(response.data.login){
                    $scope.errorArrive = false;
                    window.location.replace("/")
                  }
                  else{
                    $scope.errorArrive = true;
                    $scope.errorMessage = response.data.errorMessage
                  }
                }, function errorCallback(response) {
                    $scope.loadingIconOn = false;
                    console.error(response);
                });
    }   

    $scope.enterHandler = function($event) {
      if ($event.keycode === 13) {
        $scope.loginUser();
        console.log("Enter event triggered");
      }
    }

    $scope.pwchecker = function() {
        $scope.samePassRegister = ($scope.confirmPassword.localeCompare($scope.currentRegister.newPassword) == 0)
    }

	var init = function(){
        $scope.loadingIconOn = false;
		$scope.errorArrive = false;
  	};

	init();

}]);