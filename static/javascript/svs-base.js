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
                        controller: 'logoutCtrl',
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
		
	}

    
    $scope.login = function() {
    console.log("User logging in: " + $scope.userInfo);
    var data = {user: $scope.userInfo};

    $http({
                method: 'post',
                url: $scope.urlInput,
                data: data
            }).then(function successCallback(response) {
                //successfully got a response
                console.log(response);
                $scope.testBody = response.data;
            }, function errorCallback(response) {
                //usually happens when an exception is thrown
                console.error(response);
                $scope.testBody = "Request Failed";
            });

    };

	init();
}]);