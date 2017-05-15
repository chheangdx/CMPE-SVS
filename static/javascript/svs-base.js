var app = angular.module('CmpeSVSApp', ['ui.router']);

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});


      // $(document).ready(function(){
      //   // Add smooth scrolling to all links
      //   $("a").on('click', function(event) {
      
      //     // Make sure this.hash has a value before overriding default behavior
      //     if (this.hash !== "") {
      //       // Prevent default anchor click behavior
      //       event.preventDefault();
      
      //       // Store hash
      //       var hash = this.hash;
      
      //       // Using jQuery's animate() method to add smooth page scroll
      //       // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      //       $('html, body').animate({
      //         scrollTop: $(hash).offset().top
      //       }, 800, function(){
         
      //         // Add hash (#) to URL when done scrolling (default click behavior)
      //         window.location.hash = hash;
      //       });
      //     } // End if
      //   });
      // });


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
                var whodis = response.data['username']
                $scope.imloggedin = true
                if (whodis === 'admin')
                {
                    $scope.imadmin = true;
                }
                else
                {
                    $scope.imadmin = false;
                }
            }, function errorCallback(response) {
              $scope.imadmin = false;
              $scope.imloggedin = false;
            });
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