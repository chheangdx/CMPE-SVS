var app = angular.module('CmpeSVSApp');

app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['X-CSRFToken'] = $('meta[name=csrf_token]').attr('content');
});

app.controller('testerCtrl',  ['$scope','$http', '$sce', function($scope,$http,$sce) {
		$scope.testBody = "Please test a request....";
		$scope.urlInput = "";
		$scope.dataInput = "";
		
		var urlOptions = [{'label': 'Default Tester', 'url': '/testmyrequest', 'desc': 'simple tester'}, 
			{'label': 'Web Crawl Tester', 'url': '/testWebCrawler', 'desc': 'web crawling with python'},
			{'label': 'Encryption Testing', 'url': '/stringEncryption', 'desc': 'test encryption of a string'}];
		
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
						console.log("User logging in account with username: " + $scope.packet.username);
						var data = {user: $scope.packet};
						$scope.shower = data;
						$http({
						            method: 'post',
						            url: '/login',
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
						            console.log(response);
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
						console.log("Checking if user is logged in with username: " + $scope.userForm.username.value);
						var data = {user: $scope.packet};
						$scope.shower = data;	
						$http({
					            method: 'post',
					            url: '/isLoggedIn',
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
			}
		]

		$scope.formPrep = function(target) {
			console.log("Clearing user form");
			$scope.finText = target.bText;
			$scope.userForm = angular.copy(target.targetForm);
			$scope.finFunct = target.targetFunction;
		}

		$scope.dataPrep = function() {
			console.log("Begin dataprep of current userForm");
			$scope.packet = {}
			//This function takes one of the form objects and strips it down to the data to send to backend.
			for ( var field in $scope.userForm) {
				console.log("Handling field: " + field);
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

		init();
		
}]);