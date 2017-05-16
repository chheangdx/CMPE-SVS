var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('registerCtrl',  ['$scope','$http', function($scope,$http) {

    $scope.register = function() {
        $scope.loadingIconOn = true;
      var data = {user: $scope.currentRegister};
       $http({
                 method: 'post',
                 url: '/createAccount',
                 data: data
             }).then(function successCallback(response) {
                 //successfully got a response
                 if(response.data.createAccount){
                     $scope.username = $scope.currentRegister.username
                     $scope.password = $scope.currentRegister.password
                     $scope.loginUser();
                 }
             }, function errorCallback(response) {
                $scope.loadingIconOn = false;
                 //usually happens when an exception is thrown
                 console.error(response);
             });
    }

    $scope.loginUser = function() {
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
        $scope.register();
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