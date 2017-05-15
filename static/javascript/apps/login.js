var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

function toggleLoginRegistration(){
                if($("#login").css('display') == 'block'){
                 $("#registration").css("display", "block");
                 $("#login").css("display", "none");
                }else{
                 $("#registration").css("display", "none");
                 $("#login").css("display", "block");
                }
         }

app.controller('loginCtrl',  ['$scope','$http', function($scope,$http) {

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
                  if(response.data.login){
                    $scope.errorArrive = false;
                    window.location.replace("/")
                  }
                  else{
                    $scope.errorArrive = true;
                    $scope.errorMessage = response.data.errorMessage
                  }
                }, function errorCallback(response) {
                    console.error(response);
                });
    }   
    $scope.enterHandler = function($event) {
      if ($event.keycode === 13) {
        $scope.loginUser();
        console.log("Enter event triggered");
      }
    }

	var init = function(){
		$scope.errorArrive = false;
  	};

	init();

}]);