var app = angular.module('CmpeSVSApp');

app.controller('assistDocPrepCtrl',  ['$scope','$http', '$filter', function($scope,$http,$filter) {
    $scope.addCategory = function(){
      var data = {'category' : $scope.categoryInput}
      $http({
          method : 'post',
          url : '/addCategory',
          data: data
      }).then(function successCallback(response) {
        $scope.categoryList = response.data['categoryList']
      }, function errorCallback(response) {
        console.log("HTTP Category List Response failed: " + response);
      });        
    };

    $scope.deleteCategory = function(category){
      var data = {'category' : category}
      $http({
          method : 'post',
          url : '/deleteCategory',
          data: data
      }).then(function successCallback(response) {
        $scope.categoryList = response.data['categoryList']
      }, function errorCallback(response) {
        console.log("HTTP Category List Response failed: " + response);
      });        
    };

    $scope.getCategory = function(){
      $http({
          method : 'post',
          url : '/getCategory'
      }).then(function successCallback(response) {
        $scope.categoryList = response.data['categoryList']
      }, function errorCallback(response) {
        console.log("HTTP Category List Response failed: " + response);
      });        
    };

    $scope.orderByMe = function(x) {
    $scope.myOrderBy = x;
    $scope.reverse = !$scope.reverse
    }

    $scope.documentNameList = []

    $scope.setDocument = function(docObject){
      $scope.documentName = docObject.documentName;
      $scope.status = docObject.status;
      $scope.getDocument(docObject);
    }

//get list of documents specific to user
   $scope.getDocumentNameList = function(){

      $http({
          method : 'post',
          url : '/getDocumentNameList'
      }).then(function successCallback(response) {
        //name list holds:
        //name, date created, status, student name
        $scope.documentNameList = response.data
      }, function errorCallback(response) {
        console.log("HTTP File Response failed: " + response);
      });        
   }

//retrieve a document picked from the document list
   $scope.getDocument = function(docObject){
    var data = {
      'documentName' : docObject.documentName, //Change this later to be selected value from doc
      'category' : "blankuuuu"
    }

    if($scope.status == "Incomplete"){
      $http({
        method : 'post',
        url : '/saveDocumentName',
        data : data
      }).then(function successCallback(response) {
        $scope.documentReturned = response.data
        $scope.documentGrab("/getDocument");   

      }, function errorCallback(response) {
        console.log("HTTP File Response failed: " + response);
      });   
    }
    else{
      $http({
        method : 'post',
        url : '/saveAnnotatedDocumentName',
        data : data
      }).then(function successCallback(response) {
      $scope.documentReturned = response.data
      $scope.documentGrab("/getAnnotatedDocument");   

      }, function errorCallback(response) {
        console.log("HTTP File Response failed: " + response);
      });   
    }  
   }

//save a document with annotations to backend. admin function
$scope.saveAnnotatedDocument = function(){
    $scope.annotationArray[$scope.currentPage-1] = anno.getAnnotations();
    var data  = {
      'documentName' : $scope.documentName,
      'annotations': $scope.annotationArray,
      'status' : $scope.statusChoice,
      'category' : $scope.selectedCategory
    };
    $http({
          method : 'post',
          url : '/saveAnnotatedDocument',
          data : data
      }).then(function successCallback(response) {
        $scope.getDocumentNameList();
      }, function errorCallback(response) {
        console.log("HTTP saveAnnotatedDocumentName Response failed: " + response);
      });
   }

//delete a document from the backend
   $scope.deleteDocument = function(doc){
      var data  = {
      'documentName' : doc.documentName
    };
    $http({
          method : 'post',
          url : '/deleteDocument',
          data : data
      }).then(function successCallback(response) {
        $scope.getDocumentNameList();
      }, function errorCallback(response) {
        console.log("HTTP deleteDocument Response failed: " + response);
    });        
   }

//save a document to backend, from normal user
    $scope.saveDocument = function(){
    var data  = {
      'documentName' : $scope.documentName,
      'category' : $scope.selectedCategory
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
            $scope.getDocumentNameList();
            $scope.uploadMutex = false;
          }, function errorCallback(response) {
            $scope.uploadMutex = false;
            console.log("HTTP saveDocument Response failed: " + response);
          });
        }

      }, function errorCallback(response) {
        console.log("HTTP saveDocumentName Response failed: " + response);
      });        

   }

   $scope.nextPage = function(){
    $scope.pageGrab($scope.currentPage + 1)
   }

   $scope.previousPage = function(){
    $scope.pageGrab($scope.currentPage - 1)
   }

   $scope.pageGrab = function(tarPage,begin=false){
    if(!begin){
      $scope.annotationArray[$scope.currentPage-1] = anno.getAnnotations();
    }

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
                image.onload = function() {
                  anno.makeAnnotatable(document.getElementById('pdfview'));

                  //adding previous annotation block
                  if(!begin){
                    curpage = $scope.currentPage-1
                  }
                  else{
                    curpage = 0
                  }
                  console.log("leng:"+$scope.annotationArray[curpage]+"\n")
                  try{
                      for (var i = 0; i < 30; i++){
                          var annotation = $scope.annotationArray[curpage][i];
                          if(!annotation)
                          {
                            i = 30;
                          }
                          else{
                            console.log("annotation add")
                            anno.addAnnotation(annotation);
                          }
                        }
                    }
                    catch(err){
                      console.log("No annotations available");
                    }

                }
                image.src = canvas.toDataURL('image/jpeg');         
          });
          

    });
   }

    $scope.documentGrab = function(url){

            PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {
            //
            // Fetch the page desired
            //
            $scope.pdf = pdf;
            if($scope.status == "Incomplete"){
              $scope.annotationArray = Array($scope.pdf.numPages);
              $scope.pageGrab(1, true); //true because this is the beginning
            }
            else{
              $scope.annotationsGrab();
            }

            $scope.docUp = false;
      }); 
    }

    $scope.annotationsGrab = function(){
      if($scope.status != "Incomplete"){
        var data  = {
        'documentName' : $scope.documentName
        };
        $http({
              method : 'post',
              url : '/getAnnotations',
              data : data
          }).then(function successCallback(response) {
            $scope.annotationArray = response.data['documentAnnotation'];
            $scope.pageGrab(1, true); //true because this is the beginning
          }, function errorCallback(response) {
            console.log("HTTP getAnnotations Response failed: " + response);
        });
      }        
    }

   var init = function(){
      $scope.uploadMutex = false;
      $scope.categoryList = [];
      $scope.myOrderBy = "dateCreated";
      $scope.reverse = false;
      $scope.docUp = true;
      $scope.getCategory();
      $scope.choiceList = [
        'Incomplete',
        'Reviewed'
      ]
      try{
        $scope.getDocumentNameList();
	     }
       catch(err){
        console.log("No documents in database");
       }
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