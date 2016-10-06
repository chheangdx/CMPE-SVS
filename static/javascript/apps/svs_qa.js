var app = angular.module('qaApp', []);
app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});
app.controller('qaCtrl',  ['$scope','$http', '$sce', function($scope,$http,$sce) {
    
}]);