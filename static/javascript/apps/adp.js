var app = angular.module('CmpeSVSApp');

app.controller('assistDocPrepCtrl',  ['$scope','$http', '$filter', function($scope,$http,$filter) {
    
    $scope.myOrderBy = "dateCreated";
    $scope.reverse = false;
    $scope.orderByMe = function(x) {
    $scope.myOrderBy = x;
    $scope.reverse = !$scope.reverse
    }

    $scope.documentNameList = [
    {
      documentName:"Hello.pdf",
      status:"Good",
      uploadDate:1288323123006
    },
    {
      documentName:"Bye.pdf",
      status:"Bad",
      uploadDate:1218323123006
    },
    {
      documentName:"Suc.pdf",
      status:"hot",
      uploadDate:1288166123006
    },
    {
      documentName:"Aeeeaaa.pdf",
      status:"not",
      uploadDate:1285513123006
    },
    {
      documentName:"dddaaa.pdf",
      status:"not",
      uploadDate:1283313123006
    },
    {
      documentName:"bbbaaa.pdf",
      status:"not",
      uploadDate:1282213123006
    },
    {
      documentName:"cccc.pdf",
      status:"not",
      uploadDate:1338113123006
    }
    ]

    $scope.setDocumentName = function(passedDocumentName){
      $scope.documentName = passedDocumentName;
    }

//get list of documents specific to user
   $scope.getDocumentNameList = function(){

      $http({
          method : 'post',
          url : '/getDocumentNameList'
      }).then(function successCallback(response) {
        console.log(response);
        //name list holds:
        //name, date created, status, student name
        $scope.documentNameList = response.data
      }, function errorCallback(response) {
        console.log("HTTP File Response failed: " + response);
      });        
   }

//retrieve a document picked from the document list
   $scope.getDocument = function(){

      var data = {
        'documentName' : $scope.documentName //Change this later to be selected value from doc
      }
      $http({
          method : 'post',
          url : '/saveDocumentName',
          data : data
      }).then(function successCallback(response) {
        console.log(response);

        $scope.documentReturned = response.data
        $scope.documentGrab("/getDocument");   

      }, function errorCallback(response) {
        console.log("HTTP File Response failed: " + response);
      });        
   }

//get all existing documents that arent completed
   $scope.adminGetUncompletedDocuments = function(){

      $http({
          method : 'post',
          url : '/adminGetUncompletedDocuments'
      }).then(function successCallback(response) {
        console.log(response);
        $scope.documentNameList = response.data
      }, function errorCallback(response) {
        console.log("HTTP File Response failed: " + response);
      });        
   }

//get all existing documents that are completed
   $scope.adminGetCompletedDocuments = function(){

      $http({
          method : 'post',
          url : '/adminGetCompletedDocuments'
      }).then(function successCallback(response) {
        console.log(response);
        $scope.documentNameList = response.data
      }, function errorCallback(response) {
        console.log("HTTP File Response failed: " + response);
      });        
   }

//wip
   $scope.displayAnnotationObject = function(){
       $scope.annotationsV = anno.getAnnotations();

   }

//save a document with annotations to backend. admin function
   $scope.saveAnnotatedDocument = function(){
    if(!$scope.uploadMutex){
      $scope.uploadMutex = true;
      var file = $scope.myFile;
      var fd = new FormData();
      
      fd.append('file', file);
         
      $http({
        method : 'post',
        url : '/saveAnnotatedDocument',
        data : fd
      }).then(function successCallback(response) {
        //console.log(response);
        var annotations = anno.getAnnotations();
        $http({
            method : 'post',
            url : '/saveAnnotationAnnotations',
            data : {'annotations': annotations}
        }).then(function successCallback(response) {
          $scope.uploadMutex = false;
          console.log("Annotated document saved successfully.");
        }, function errorCallback(response) {
          $scope.uploadMutex = false;
          console.log("HTTP File Response failed: " + response);
        });
      }, function errorCallback(response) {
        $scope.uploadMutex = false;
        console.log("HTTP File Response failed: " + response);
      });
    }
   }

//delete a document from the backend
   $scope.deleteDocument = function(){
      $http({
          method : 'post',
          url : '/deleteDocument'
      }).then(function successCallback(response) {
        console.log("Delete document success.");
      }, function errorCallback(response) {
        console.log("HTTP File Response failed: " + response);
      });        
   }

//save a document to backend, from normal user
    $scope.saveDocument = function(){
    var data  = {
      'documentName' : $scope.documentName
    };
    $http({
          method : 'post',
          url : '/saveDocumentName',
          data : data
      }).then(function successCallback(response) {

        if(!$scope.uploadMutex){
          $scope.uploadMutex = true;
          var file = $scope.myFile;
          var fd = new FormData();
          
          fd.append('file', file);
             
          $http({
            method : 'post',
            url : '/saveDocument',
            data : fd
          }).then(function successCallback(response) {
            console.log(response);
            $scope.uploadMutex = false;
          }, function errorCallback(response) {
            $scope.uploadMutex = false;
            console.log("HTTP File Response failed: " + response);
          });
        }

      }, function errorCallback(response) {
        console.log("HTTP File Response failed: " + response);
      });        

   }

//test uploading of a document
  $scope.testFile = function(){
    if(!$scope.uploadMutex){
      $scope.uploadMutex = true;
  		var file = $scope.myFile;
  		var fd = new FormData();
  		
      fd.append('file', file);
         
  		$http({
  			method : 'post',
  			url : '/fileTest',
  			data : fd
  		}).then(function successCallback(response) {
  			//console.log(response);
  			var annotations = anno.getAnnotations();
  			$http({
  					method : 'post',
  					url : '/annotationTest',
  					data : {'annotations': annotations}
  			}).then(function successCallback(response) {
  			  $scope.uploadMutex = false;
  				console.log(response);
  			}, function errorCallback(response) {
          $scope.uploadMutex = false;
  				console.log("HTTP File Response failed: " + response);
  			});
  		}, function errorCallback(response) {
        $scope.uploadMutex = false;
  			console.log("HTTP File Response failed: " + response);
  		});
    }
	};

   $scope.nextPage = function(){
    $scope.pageGrab($scope.currentPage + 1)
   }

   $scope.previousPage = function(){
    $scope.pageGrab($scope.currentPage - 1)
   }

   $scope.checkAnnotations = function(){
   		console.log(anno.getAnnotations());   
   }

   $scope.checkAnnotationsBackEnd = function(){
   	   		var annotations = anno.getAnnotations();
			//annotations[0]['text'] = sjcl.encrypt("password", annotations[0]['text']);
			$http({
					method : 'post',
					url : '/annotationTest',
					data : {'annotations': annotations}
			}).then(function successCallback(response) {
			
				console.log(response);
			}, function errorCallback(response) {
				console.log("HTTP File Response failed: " + response);
			});   	   
//   	   $http({
//   	   		   method : 'post',
//   	   		   url : '/annotationTestGet'
//   	   }).then(function successCallback(response) {
//   	   	   console.log(response.data);
//  	   }, function errorCallback(response) {
//   	   	   console.log("HTTP File Response failed: " + response);
//   	   });
   }

   $scope.getTestDoc = function(){
      var url = "/fileTestGet";
      PDFJS.workerSrc = "/static/javascript/adp-js/pdf.worker.js";
      $scope.documentGrab(url)
   }

   $scope.pageGrab = function(tarPage){
    $scope.annotationArray[$scope.currentPage-1] = anno.getAnnotations();
    anno.removeAll();
    if(tarPage > 0 && tarPage <= $scope.pdf.numPages)
        $scope.pdf.getPage(tarPage).then(function getPageHelloWorld(page) {
          $scope.currentPage = tarPage;
          var scale = 1.5;
          var viewport = page.getViewport(scale);
          //
          // Prepare canvas using PDF page dimensions
          //
          var canvas = document.getElementById('the-canvas');
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          var renderContext = {
              canvasContext: context,
              viewport: viewport,
          };
          var task = page.render(renderContext);
          task.promise.then(function(){
                var canvas = document.getElementById('the-canvas');
                var image = document.getElementById('pdfview');
                image.src = canvas.toDataURL('image/jpeg');
               // anno.makeAnnotatable(document.getElementById('pdfview'));
                $http({
                      method : 'post',
                      url : '/annotationTestGet'
                }).then(function successCallback(response) {
                    anno.makeAnnotatable(document.getElementById('pdfview'));
                    if(response.data.length > 0){
                        console.log(response.data[0]);
                        var annotation_0 = response.data[0];
                        annotation_0["src"] = "http://stable-identifier/for-image";
                        console.log(annotation_0);
                        anno.addAnnotation(annotation_0, null);
                          
                    }


                }, function errorCallback(response) {
                    console.log("HTTP File Response failed: " + response);
                });
          });

        
          for (var i = 0; i < 30; i++){
              var annotation = $scope.annotationArray[$scope.currentPage-1][i];
              if(!annotation)
              {
                i = 30;
              }
              else{
                console.log("annotation add")
                anno.addAnnotation(annotation);
              }
          }
    });
   }

    $scope.documentGrab = function(url){
      console.log("getting document from url:" + url)
            PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {
            //
            // Fetch the page desired
            //
            $scope.pdf = pdf;
            console.log("Number of pages is " + $scope.pdf.numPages);
            $scope.annotationArray = Array($scope.pdf.numPages);
            $scope.pageGrab(1);
      });
    }

   var init = function(){
      $scope.uploadMutex = false;
	};

	init();
		
}]);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);



function gd_uploadFile(name, contentType, data, callback) {
    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    contentType = contentType || "text/html";
    var metadata = {
        name: name,
        'mimeType': contentType
    };

    var multipartRequestBody =
        delimiter +  'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n';

    //Transfer images as base64 string.
    if (contentType.indexOf('image/') === 0) {
        var pos = data.indexOf('base64,');
        multipartRequestBody += 'Content-Transfer-Encoding: base64\r\n' + '\r\n' +
            data.slice(pos < 0 ? 0 : (pos + 'base64,'.length));
    } else {
        multipartRequestBody +=  + '\r\n' + data;
    }
    multipartRequestBody += close_delim;

    if (!callback) { callback = function(file) { console.log("Update Complete ", file) }; }

    superagent.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart').
        set('Content-Type', 'multipart/form-data;  boundary="' + boundary + '"').
        set('Authorization', 'Bearer ' + gapi.auth.getToken().access_token).
        send(multipartRequestBody).
        end(function () {
            console.log(arguments);
        });
}

//On upload
/*$('#file')[0].onchange = function () {
    var file = $('#file')[0].files[0];
    if (file && file.type === 'image/jpeg') {
        var reader = new FileReader();
        reader.onloadend = function () {
            var data = reader.result;
            gd_uploadFile('img.jpg', 'image/jpeg', data, function () {
                console.log(arguments);
            });
        }
        reader.readAsDataURL(file);
    }
};*/