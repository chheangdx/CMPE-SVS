var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('welcomeCtrl',  ['$scope','$http', '$sce', '$state', function($scope,$http,$sce,$state) {

    $scope.navigate = function() {
    	console.log("welcome");
    	$state.go('watson');
    }

}]);