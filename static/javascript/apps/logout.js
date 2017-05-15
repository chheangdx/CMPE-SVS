var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('settingsCtrl',  ['$scope','$http', function($scope,$http) {

		$scope.userFunctions = [
			{	
				bText : "Login",
				targetForm : { 
				username:{field:"Username", value:"", type:"text", key: 0},
				password:{field:"Password", value:"", type:"password", key: 1},
				stayLoggedIn:{field:"Stay Logged In?", value:"false", type:"checkbox", key: 6}
				},
				targetFunction : function() {
						$scope.dataPrep();
						var data = {user: $scope.packet};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/login',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						         	$scope.message = response.data
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
				}
			},

			{
				bText : "Logout",
				targetForm : {
				},
				targetFunction : function() {
						$scope.dataPrep();
						var data = {user: $scope.packet};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/logout',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            $scope.message = response.data
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
				}
			},
			{
				bText : "Get Notifications",
				targetForm : {
				},
				targetFunction : function() {
						$scope.dataPrep();
						var data = {user: $scope.packet};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/getNotifications',
						            data: data
						        }).then(function successCallback(response) {
						            $scope.message = response.data
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
				}
			},

			{
				bText : "Remove All Notifications",
				targetForm : {				},
				targetFunction : function() {
						$scope.dataPrep();
						var data = {user: $scope.packet};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/removeAllNotifications',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						            $scope.message = response.data
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
				}
			},

			{
				bText : "Remove Notification",
				targetForm : {	},
				targetFunction : function() {
						$scope.dataPrep();
						var data = {user: $scope.packet};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/removeNotification',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						            $scope.message = response.data
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
				}
			},

			{
				bText : "Change Password",
				targetForm : {
				password:{field:"Password", value:"", type:"password", key: 1},
				newPassword:{field:"New Password", value:'', type:"text", key: 7}
				},
				targetFunction : function() {
						$scope.dataPrep();
						var data = {user: $scope.packet};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/changePassword',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						            $scope.message = response.data
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
				}
			},

			{
				bText : "Change Email",
				targetForm : {
				password:{field:"Password", value:"", type:"password", key: 1},
				newEmail:{field:"New Email", value:"", type:"text", key: 8}
				},
				targetFunction : function() {
						$scope.dataPrep();
						var data = {user: $scope.packet};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/changeEmail',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						            $scope.message = response.data
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
				}
			},

			{
				bText : "Change First Name",
				targetForm : {
				password:{field:"Password", value:"", type:"password", key: 1},
				newFirstName:{field:"New First Name", value:"", type:"text", key: 9}
				},
				targetFunction : function() {
						$scope.dataPrep();
						var data = {user: $scope.packet};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/changeFirst',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						            $scope.message = response.data
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
				}
			},

			{
				bText : "Change Last Name",
				targetForm : {
				password:{field:"Password", value:"", type:"password", key: 1},
				newLastName:{field:"New Last Name", value:"", type:"text", key: 10}
				},
				targetFunction : function() {
						$scope.dataPrep();
						var data = {user: $scope.packet};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/changeLast',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						            $scope.message = response.data
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
				}
			},

			{
				bText : "Register",
				targetForm : {
				username:{field:"Username", value:"", type:"text", key: 0},
				password:{field:"Password", value:"", type:"password", key: 1, pwstr : "", pwstrf: function(selfo) {
						var score = 0;
					   if (!selfo.value)
					       return score;

					   // award every unique letter until 5 repetitions
					   var letters = new Object();
					   for (var i=0; i<selfo.value.length; i++) {
					       letters[selfo.value[i]] = (letters[selfo.value[i]] || 0) + 1;
					       score += 5.0 / letters[selfo.value[i]];
					   }

					   // bonus points for mixing it up
					   var variations = {
					       digits: /\d/.test(selfo.value),
					       lower: /[a-z]/.test(selfo.value),
					       upper: /[A-Z]/.test(selfo.value),
					       nonWords: /\W/.test(selfo.value),
					   }

					   variationCount = 0;
					   for (var check in variations) {
					       variationCount += (variations[check] == true) ? 1 : 0;
					   }
					   score += (variationCount - 1) * 10;

				
						if (score > 80)
					       selfo.pwstr = "Strong";
					   else if (score > 60)
					       selfo.pwstr = "Good";
					   else if (score >= 25)
					       selfo.pwstr = "Weak";
				}},
				notifyEmailToggle:{field:"Receive Email Notifications?", value:"false", type:"checkbox", key: 2},
				firstName:{field:"First Name", value:"", type:"text", key: 3},
				lastName:{field:"Last Name", value:"", type:"text", key: 4},
				email:{field:"Email", value:"", type:"text", key: 5},
				stayLoggedIn:{field:"Stay Logged In?", value:"false", type:"checkbox", key: 6}
				},
				targetFunction : function() {
						$scope.dataPrep();
						console.log("User creating account with username: " + $scope.userForm.username.value);
						var data = {user: $scope.packet};
						$scope.shower = data;
						$http({
					            method: 'post',
					            url: '/createAccount',
					            data: data
					        }).then(function successCallback(response) {
					            //successfully got a response
					            console.log(response);
					            $scope.message = response.data
					        }, function errorCallback(response) {
					            //usually happens when an exception is thrown
					            console.error(response);
					        });
				}
			},

			{
				bText : "Login Check",
				targetForm : {
				username:{field:"Username", value:"", type:"text", key: 0}
				},
				targetFunction : function() {
						$scope.dataPrep();
						var data = {user: $scope.packet};
						$scope.shower = data;	
						$http({
					            method: 'post',
					            url: '/isLoggedIn',
					            data: data
					        }).then(function successCallback(response) {
					            //successfully got a response
					            $scope.message = response.data
					        }, function errorCallback(response) {
					            //usually happens when an exception is thrown
					            console.error(response);
					        });
				}
			}
		]

		$scope.formPrep = function(target) {
			$scope.finText = target.bText;
			$scope.userForm = angular.copy(target.targetForm);
			$scope.finFunct = target.targetFunction;
		}

		$scope.dataPrep = function() {
			$scope.packet = {}
			//This function takes one of the form objects and strips it down to the data to send to backend.
			for ( var field in $scope.userForm) {
				switch ($scope.userForm[field].key) {
					case 0:
						$scope.packet.username = $scope.userForm[field].value;
						break;
					case 1:
						$scope.packet.password = $scope.userForm[field].value;
						break;
					case 2:
						$scope.packet.notifyEmailToggle = $scope.userForm[field].value;
						break;
					case 3:
						$scope.packet.firstName = $scope.userForm[field].value;
						break;
					case 4:
						$scope.packet.lastName = $scope.userForm[field].value;
						break;
					case 5:
						$scope.packet.email = $scope.userForm[field].value;
						break;
					case 6:
						$scope.packet.stayLoggedIn = $scope.userForm[field].value;
						break;
					case 7:
						$scope.packet.newPassword = $scope.userForm[field].value;
						break;
					case 8:
						$scope.packet.newEmail = $scope.userForm[field].value;
						break;
					case 9:
						$scope.packet.newFirstName = $scope.userForm[field].value;
						break;
					case 10:
						$scope.packet.newLastName = $scope.userForm[field].value;
						break;
				}
			}
		} 

		$scope.userFormDefault = {
				username:{field:"Username", value:"", type:"text", key: 0},
				password:{field:"Password", value:"", type:"text", key: 1},
				notifyEmailToggle:{field:"Receive Email Notifications?", value:"false", type:"checkbox", key: 2},
				firstName:{field:"First Name", value:"", type:"text", key: 3},
				lastName:{field:"Last Name", value:"", type:"text", key: 4},
				email:{field:"Email", value:"", type:"text", key: 5},
				stayLoggedIn:{field:"Stay Logged In?", value:"false", type:"checkbox", key: 6}
		};

		$scope.submitChange = function() {

		}

		$scope.prefillValues = function(){
			var data = {}
	        $http({
	                method: 'post',
	                url: '/getAccountInformation',
	                data: data
	            }).then(function successCallback(response) {
	                $scope.currentUser = response.data
	            }, function errorCallback(response) {
	            
	            });
		}

		$scope.edit = function() {
			$scope.enableFields = !$scope.enableFields;
		}

		$scope.pwchecker = function() {
			$scope.samePass = ($scope.newPassword == $scope.reconfirmedPass)
		}

		$scope.passPattern = '/^.{8,32}$/';
		$scope.emailPattern = '/^.+@.+\\..+$/';

	var init = function(){
		$scope.currentUser = {username:'ass',
		firstName:'nick',
		lastName:'carter'}
		$scope.prefillValues()
		$scope.enableFields = false
		$scope.pwForm = false
		$scope.emailForm = false
		$scope.samePass = false
		$scope.newPassword="********"
  	};

	init();

}]);