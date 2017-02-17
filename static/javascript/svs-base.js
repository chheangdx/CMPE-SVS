/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.marginLeft = "0px";
}

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
                        templateUrl: '/static/partials/prescreen.html',
                        controller: 'prescreenCtrl',
                    })
                    
                    .state('aboutus', {
                        url: '/aboutus',
                        templateUrl: '/static/partials/aboutus.html',
                        controller: 'aboutusCtrl',
                    })
                    
                    .state('settings', {
                        url: '/settings',
                        templateUrl: '/static/partials/settings.html',
                        controller: 'settingsCtrl',
                    })

                    .state('logout', {
                        url: '/logout',
                        templateUrl: '/static/partials/logout.html',
                        controller: 'logoutCtrl',
                    })
                    
                    .state('tester', {
                    	url: '/tester',
                    	templateUrl: '/static/partials/tester.html',
                    	controller: 'testerCtrl',
                    });
      
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