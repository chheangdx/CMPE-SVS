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



	var init = function(){
		
  	};

	init();

}]);