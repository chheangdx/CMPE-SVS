var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('testerCtrl',  ['$scope','$http', '$sce', function($scope,$http,$sce) {
		$scope.testBody = "Please test a request....";
		$scope.urlInput = "";
		$scope.dataInput = "";
		
		var urlOptions = [{'label': 'Default Tester', 'url': '/testmyrequest', 'desc': 'simple tester'}, 
			{'label': 'Web Crawl Tester', 'url': '/testWebCrawler', 'desc': 'web crawling with python'}];
		
		$scope.test = function() {
			console.log("Button was clicked!");
			if($scope.urlInput == ""){
				alert("Error! No url to test!");
				return;
			}
			var data = {data: $scope.dataInput}; //not that key is not in quotes
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
		
		var split = function(val) {
			return val.split(/,\s*/);
		};
		var extractLast = function(term) {
			return split(term).pop();
		};
		
		var init = function(){
			$("#urlinput").autocomplete({
					source: urlOptions,
				    search: function () {
				        // custom minLength
				        var term = extractLast(this.value);
				        if (term.length < 0) {
				            return false;
				        }
				    },
				    autoFocus: true,
				    minLength: 0,
				    focus: function () {
				        // prevent value inserted on focus
				        return false;
				    },
				    select: function (event, ui) {
				        var terms = split(this.value);
//				        // remove the current input
				        terms.pop();
//				        // add the selected item
				        terms.push(ui.item.url);
//				        // add placeholder to get the comma-and-space at the end
				        terms.push("");
				    	
				    	this.value = terms.join("");
				    	$scope.urlInput = this.value;
				    	
				        return false;
				    }
				}).focus(function(){
					$(this).autocomplete("search", "");
				}).data("ui-autocomplete")._renderItem = function(ul, item){
					return $("<li></li>")
					.data("ui-autocomplete-item", item)
					.append("<a style='display: inline-block;width: 100%;'><h5 class='textOverflow'><div style='border-bottom: 1px solid yellow'>" + item.label + "</div>" + item.desc + "</h5></a>")
					.appendTo(ul);
				};
			
		};

		$(document).on("click", ".open-Modal", function () {
    		var functionName = $(this).data('id');
    		$(".modal-body #functionName").val( functionName );
    		$scope.functionName = functionName;
		});

		$scope.userFunctions = [
			{	
				bText : "Login",
				targetForm : 'login'
			},
			{
				bText : "Logout",
				targetForm : 'logout'
			},
			{
				bText : "Get Notifications",
				targetForm : 'getNotifications'
			},
			{
				bText : "Remove All Notifications",
				targetForm : 'removeAllNotifications'
			},
			{
				bText : "Remove Notification",
				targetForm : 'removeNotification'
			},
			{
				bText : "Change Password",
				targetForm : 'changePassword'
			},
			{
				bText : "Change Email",
				targetForm : 'changeEmail'
			},
			{
				bText : "Change First Name",
				targetForm : 'changeFirst'
			},
			{
				bText : "Change Last Name",
				targetForm : 'changeLast'
			},
			{
				bText : "Register",
				targetForm : 'createAccount'
			},
			{
				bText : "Login Check",
				targetForm : 'isLoggedIn'
			}
		]

		$scope.formPrep = function(target) {
			console.log("Clearing user form");
			switch(target){
				case 'login':
					$scope.finText = "Login";
					$scope.userForm = angular.copy($scope.loginForm);
					$scope.finFunct = function() {
						console.log("User logging in account with username: " + $scope.userForm.username.value);
						var data = {user: $scope.userForm};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/login',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
					};
					break;

				case 'logout':
					$scope.finText = "Logout";
					$scope.userForm = angular.copy($scope.logoutForm);
					$scope.finFunct = function() {
						console.log("User logging out account with username: " + $scope.userForm.username.value);
						var data = {user: $scope.userForm};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/logout',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
					};
					break;

				case 'getNotifications':
					$scope.finText = "Get Notifications";
					$scope.userForm = angular.copy($scope.getNotificationsForm);
					$scope.finFunct = function() {
						console.log("Getting user notifications with username: " + $scope.userForm.username.value);
						var data = {user: $scope.userForm};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/getNotifications',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
					};
					break;

				case 'removeAllNotifications':
					$scope.finText = "Remove All Notifications";
					$scope.userForm = angular.copy($scope.removeAllNotificationsForm);
					$scope.finFunct = function() {
						console.log("Removing all notifications with username: " + $scope.userForm.username.value);
						var data = {user: $scope.userForm};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/removeAllNotifications',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
					};
					break;

				case 'removeNotification':
					$scope.finText = "Remove a Notification";
					$scope.userForm = angular.copy($scope.removeNotificationForm);
					$scope.finFunct = function() {
						console.log("Removing one notification with username: " + $scope.userForm.username.value);
						var data = {user: $scope.userForm};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/removeNotification',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
					};
					break;

				case 'changePassword':
					$scope.finText = "Change Password";
					$scope.userForm = angular.copy($scope.changePasswordForm);
					$scope.finFunct = function() {
						console.log("Changing password with username: " + $scope.userForm.username.value);
						var data = {user: $scope.userForm};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/changePassword',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
					};
					break;

				case 'changeEmail':
					$scope.finText = "Change Email";
					$scope.userForm = angular.copy($scope.changeEmailForm);
					$scope.finFunct = function() {
						console.log("Changing Email with username: " + $scope.userForm.username.value);
						var data = {user: $scope.userForm};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/changeEmail',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
					};
					break;

				case 'changeFirst':
					$scope.finText = "Change First Name";
					$scope.userForm = angular.copy($scope.changeFirstForm);
					$scope.finFunct = function() {
						console.log("Changing first name with username: " + $scope.userForm.username.value);
						var data = {user: $scope.userForm};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/changeFirst',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
					};
					break;

				case 'changeLast':
					$scope.finText = "Change Last";
					$scope.userForm = angular.copy($scope.changeLastForm);
					$scope.finFunct = function() {
						console.log("Changing Last with username: " + $scope.userForm.username.value);
						var data = {user: $scope.userForm};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/changeLast',
						            data: data
						        }).then(function successCallback(response) {
						            //successfully got a response
						            console.log(response);
						        }, function errorCallback(response) {
						            //usually happens when an exception is thrown
						            console.error(response);
						        });
					};
					break;

				case 'createAccount':
					$scope.finText = "Register";
					$scope.userForm = angular.copy($scope.registerForm);
					$scope.finFunct = function() {
						console.log("User creating account with username: " + $scope.userForm.username.value);
						var data = {user: $scope.userForm};
						$scope.shower = data;
						$http({
					            method: 'post',
					            url: '/createAccount',
					            data: data
					        }).then(function successCallback(response) {
					            //successfully got a response
					            console.log(response);
					        }, function errorCallback(response) {
					            //usually happens when an exception is thrown
					            console.error(response);
					        });
					};
					break;

				case 'isLoggedIn':
					$scope.finText = "Is Logged In";
					$scope.userForm = angular.copy($scope.isLoggedInForm);
					$scope.finFunct = function() {
						console.log("Checking if user is logged in with username: " + $scope.userForm.username.value);
						var data = {user: $scope.userForm};
						$scope.shower = data;	
						$http({
					            method: 'post',
					            url: '/isLoggedIn',
					            data: data
					        }).then(function successCallback(response) {
					            //successfully got a response
					            console.log(response);
					        }, function errorCallback(response) {
					            //usually happens when an exception is thrown
					            console.error(response);
					        });
					};
					break;
			}
		}

		$scope.userFormDefault = {
				username:{field:"Username", value:"", type:"text"},
				password:{field:"Password", value:"", type:"text"},
				notifyEmailToggle:{field:"Receive Email Notifications?", value:"false", type:"checkbox"},
				firstName:{field:"First Name", value:"", type:"text"},
				lastName:{field:"Last Name", value:"", type:"text"},
				email:{field:"Email", value:"", type:"text"},
				stayLoggedIn:{field:"Stay Logged In?", value:"false", type:"checkbox"}
		};

		$scope.loginForm = { 
			username:{field:"Username", value:"", type:"text"},
			password:{field:"Password", value:"", type:"text"},
			stayLoggedIn:{field:"Stay Logged In?", value:"false", type:"checkbox"}
		};

		$scope.logoutForm = {
				username:{field:"Username", value:"", type:"text"}
		};

		$scope.getNotificationsForm = {
				username:{field:"Username", value:"", type:"text"},
				password:{field:"Password", value:"", type:"text"},
				notifyEmailToggle:{field:"Receive Email Notifications?", value:"false", type:"checkbox"},
				firstName:{field:"First Name", value:"", type:"text"},
				lastName:{field:"Last Name", value:"", type:"text"},
				email:{field:"Email", value:"", type:"text"},
				stayLoggedIn:{field:"Stay Logged In?", value:"false", type:"checkbox"}
		};

		$scope.removeAllNotificationsForm = {
				username:{field:"Username", value:"", type:"text"}
		};

		$scope.removeNotificationForm = {
				username:{field:"Username", value:"", type:"text"}
		};

		$scope.changePasswordForm = {
				username:{field:"Username", value:"", type:"text"},
				password:{field:"Password", value:"", type:"text"},
				newPassword:{field:"New Password", value:'', type:"text"}
		};

		$scope.changeEmailForm = {
				username:{field:"Username", value:"", type:"text"},
				newEmail:{field:"New Email", value:"", type:"text"}
		};

		$scope.changeFirstForm = {
				username:{field:"Username", value:"", type:"text"},
				newFirstName:{field:"New First Name", value:"", type:"text"}
		};

		$scope.changeLastForm = {
				username:{field:"Username", value:"", type:"text"},
				newLastName:{field:"New Last Name", value:"", type:"text"}
		};

		$scope.createAccountForm = {
				username:{field:"Username", value:"", type:"text"},
				password:{field:"Password", value:"", type:"text"},
				notifyEmailToggle:{field:"Receive Email Notifications?", value:"false", type:"checkbox"},
				firstName:{field:"First Name", value:"", type:"text"},
				lastName:{field:"Last Name", value:"", type:"text"},
				email:{field:"Email", value:"", type:"text"},
				stayLoggedIn:{field:"Stay Logged In?", value:"false", type:"checkbox"}
		};

		$scope.isLoggedInForm = {
				username:{field:"Username", value:"", type:"text"}
		};

		init();
		
}]);