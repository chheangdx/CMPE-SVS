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
			var data = {'data': $scope.dataInput};
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
		init();
		
}]);