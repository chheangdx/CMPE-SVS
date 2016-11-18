var app = angular.module('CmpeSVSApp');
app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});
app.controller('aboutusCtrl',  ['$scope','$http', '$sce', function($scope,$http,$sce) {
    $scope.contort = function(){
    	console.log("aboutus");
    }
}]);