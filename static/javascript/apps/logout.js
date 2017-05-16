var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('settingsCtrl',  ['$scope','$http', function($scope,$http) {

		$scope.passwordPattern = /^.{8,32}$/;
		$scope.cSamePass = "samePass";
		$scope.cSameEmail = "sameEmail";

	// {
	// 			bText : "Register",
	// 			targetForm : {
	// 			username:{field:"Username", value:"", type:"text", key: 0},
	// 			password:{field:"Password", value:"", type:"password", key: 1, pwstr : "", pwstrf: function(selfo) {
	// 					var score = 0;
	// 				   if (!selfo.value)
	// 				       return score;

	// 				   // award every unique letter until 5 repetitions
	// 				   var letters = new Object();
	// 				   for (var i=0; i<selfo.value.length; i++) {
	// 				       letters[selfo.value[i]] = (letters[selfo.value[i]] || 0) + 1;
	// 				       score += 5.0 / letters[selfo.value[i]];
	// 				   }

	// 				   // bonus points for mixing it up
	// 				   var variations = {
	// 				       digits: /\d/.test(selfo.value),
	// 				       lower: /[a-z]/.test(selfo.value),
	// 				       upper: /[A-Z]/.test(selfo.value),
	// 				       nonWords: /\W/.test(selfo.value),
	// 				   }

	// 				   variationCount = 0;
	// 				   for (var check in variations) {
	// 				       variationCount += (variations[check] == true) ? 1 : 0;
	// 				   }
	// 				   score += (variationCount - 1) * 10;

				
	// 					if (score > 80)
	// 				       selfo.pwstr = "Strong";
	// 				   else if (score > 60)
	// 				       selfo.pwstr = "Good";
	// 				   else if (score >= 25)
	// 				       selfo.pwstr = "Weak";
	// 			}},
	// 			notifyEmailToggle:{field:"Receive Email Notifications?", value:"false", type:"checkbox", key: 2},
	// 			firstName:{field:"First Name", value:"", type:"text", key: 3},
	// 			lastName:{field:"Last Name", value:"", type:"text", key: 4},
	// 			email:{field:"Email", value:"", type:"text", key: 5},
	// 			stayLoggedIn:{field:"Stay Logged In?", value:"false", type:"checkbox", key: 6}
	// 			},
	// 			targetFunction : function() {
	// 					$scope.dataPrep();
	// 					console.log("User creating account with username: " + $scope.userForm.username.value);
	// 					var data = {user: $scope.packet};
	// 					$scope.shower = data;
	// 					$http({
	// 				            method: 'post',
	// 				            url: '/createAccount',
	// 				            data: data
	// 				        }).then(function successCallback(response) {
	// 				            //successfully got a response
	// 				            console.log(response);
	// 				            $scope.message = response.data
	// 				        }, function errorCallback(response) {
	// 				            //usually happens when an exception is thrown
	// 				            console.error(response);
	// 				        });
	// 			}
	// 		}


		$scope.enterHandler = function($event) {
			if ($event.keycode === 13) {
				$scope.editAccountInformation();
				console.log("Enter event triggered");
			}
		}

		$scope.editAccountInformation = function() {
			$scope.savedEmail = $scope.currentUser.email
			var data = {
				user:$scope.currentUser
			}


			console.log(data)
			$http({
	                method: 'post',
	                url: '/editAccountInformation',
	                data: data
	            }).then(function successCallback(response) {
	                console.log("succ")
	                $scope.errorArrived = false;
	                $scope.currentUser.email = $scope.savedEmail
	            }, function errorCallback(response) {
	            	if(response.id == 1)
	            		$scope.errorArrived = true;
	            		$scope.errorMessage = response.error;
	            		$scope.currentUser.oldPassword = "";
	            		$scope.currentUser.newPassword = "";
	            		$scope.reconfirmedPass = ""
	            });
		}

		$scope.prefillValues = function(){
			var data = {}
	        $http({
	                method: 'post',
	                url: '/getAccountInformation',
	                data: data
	            }).then(function successCallback(response) {
	                $scope.currentUser = response.data
	                $scope.oldEmail = $scope.currentUser.email
	                $scope.currentUser.newPassword = '********'

	                $scope.currentUser.oldPassword = ""
	            }, function errorCallback(response) {
	            
	            });
		}

		$scope.edit = function() {
			$scope.enableFields = !$scope.enableFields;
		}

		$scope.checker = function(var1, var2, bool) {
			console.log(var1);
			console.log(var2);
			if(bool == 'samePass') {
				console.log(bool);
				$scope.$samePass = (var1.localeCompare(var2) == 0);
				console.log($scope.$samePass);
			}
			if(bool == 'sameEmail') {
				console.log(bool);
				$scope.$sameEmail = (var1.localeCompare(var2) == 0);
				console.log($scope.$sameEmail);
			}
		}

	var init = function(){
		$scope.prefillValues()
		$scope.enableFields = false
		$scope.pwForm = false
		$scope.emailForm = false
		$scope.samePass = false
  	};

	init();

}]);