var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('welcomeCtrl',  ['$scope','$http', '$sce', '$state', function($scope,$http,$sce,$state) {
	var init = function() {
		$scope.imloggedin = false;
		$scope.imadminwelcome = false;
		$scope.loggedIn();
	}

	$scope.loggedIn = function() {
        //make a call to back to see if the user logged in is 'admin'
        
        try{
        $http({
                method: 'post',
                url: '/whoAmI'
            }).then(function successCallback(response) {
                var whodis = response.data
                if(whodis.request){
                    $scope.imloggedin = true
                    console.log(whodis)
                    if (whodis.username.localeCompare('admin') == 0)
                    {
                        $scope.imadminwelcome = true;
                    }
                    else
                    {
                        $scope.imadminwelcome = false;
                    }
                }
            }, function errorCallback(response) {
              $scope.imadminwelcome = false;
              $scope.imloggedin = false;
            });
          }
          catch(err) {
            console.log("User not logged in.")
          }
    }

    $scope.navigate = function() {
    	console.log("welcome");
    	$state.go('watson');
    }
    init();

}]);