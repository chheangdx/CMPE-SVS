var app = angular.module('CmpeSVSApp', ['ui.router']);

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});



app.config(
            ['$stateProvider',
             '$urlRouterProvider',
                     
            function ($stateProvider,
                      $urlRouterProvider) {
      
                $stateProvider
      
                    .state('welcome', {
                        url: '/',
                        templateUrl: '/static/partials/welcome.html',
                        controller: ''
                    })
      
                    .state('watson', {
                        url: '/watson',
                        templateUrl: '/static/partials/watson.html',
                        controller: 'watsonCtrl',
                    })

                    .state('prescreen', {
                        url: '/prescreen',
                        templateUrl: '/static/partials/pdfviewer.html',
                        controller: 'assistDocPrepCtrl',
                    })

                    .state('prescreenadmin', {
                        url: '/prescreenadmin',
                        templateUrl: '/static/partials/pdfvieweradmin.html',
                        controller: 'assistDocPrepAdminCtrl',
                    })
                    
                    .state('aboutus', {
                        url: '/aboutus',
                        templateUrl: '/static/partials/aboutus.html',
                        controller: 'aboutusCtrl',
                    })

                    .state('settings', {
                        url: '/settings',
                        templateUrl: '/static/partials/logout.html',
                        controller: 'settingsCtrl',
                    })

                    .state('login', {
                        url: '/login',
                        templateUrl: '/static/partials/login.html',
                        controller: 'loginCtrl',
                    })
      
                $urlRouterProvider.otherwise('/');
            }]);


app.controller('CmpeSVSCtrl',  ['$scope','$http', function($scope,$http) {
	var init = function(){
		$scope.loggedIn()
	}

    $scope.loggedIn = function() {
        //make a call to back to see if the user logged in is 'admin'
        var data = {}
        $http({
                method: 'post',
                url: '/whoAmI',
                data: data
            }).then(function successCallback(response) {
                var whodis = response.data
                $scope.imloggedin = true
                console.log(whodis.length + " " + '"admin"'.length)
                if (whodis.localeCompare('"admin"') == 0)
                {
                  console.log("yes")
                    $scope.imadmin = true;
                }
                else
                {
                  console.log("no")
                    $scope.imadmin = false;
                }
            }, function errorCallback(response) {
              $scope.imadmin = false;
              $scope.imloggedin = false;
            });
    }

	init();
}]);