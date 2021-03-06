var app = angular.module('CmpeSVSApp');

app.controller('assistDocPrepCtrl',  ['$scope','$http', '$filter', function($scope,$http,$filter) {

    $scope.getCategory = function(){
      $http({
          method : 'post',
          url : '/getCategory'
      }).then(function successCallback(response) {
        if(response.data['categoryList'])
          {
            $scope.categoryList = response.data['categoryList']
          }
          else{
            console.log("Category List undefined")
          }
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
      $scope.loadingIconOn = true;
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
        if(response.data.request){
          $scope.documentNameList = response.data.documentList
          console.log(response.data.documentList)
        }
        else{
          $scope.documentNameList = []
        }
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
      $('#myModal').modal('hide');   

      }, function errorCallback(response) {
        console.log("HTTP File Response failed: " + response);
      });   
    }  
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
    $scope.loadingIconOnModal = true;
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
            $scope.loadingIconOnModal = false;
            $scope.getDocumentNameList();
            $('#myModal').modal('hide');
            $scope.uploadMutex = false;
          }, function errorCallback(response) {
            $scope.loadingIconOnModal = false;
            $scope.uploadMutex = false;
            console.log("HTTP saveDocument Response failed: " + response);
          });
        }

      }, function errorCallback(response) {
        $scope.loadingIconOnModal = false;
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
{
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
                  

                  //adding previous annotation block
                  if(!begin){
                    curpage = $scope.currentPage-1
                  }
                  else{
                    curpage = 0
                  }
                  console.log("leng:"+$scope.annotationArray[curpage]+"\n")

                  $scope.docUp = false;
                  $scope.loadingIconOn = false;
                  $scope.borderStyle = {'border':'1px solid black'}

                  $scope.$apply()
                  setTimeout(function () {
                    anno.makeAnnotatable(document.getElementById('pdfview'));
                  }, 1000);
                  
                  try{
                      for (var i = 0; i < 30; i++){
                        if (typeof $scope.annotationArray[curpage][i] != 'undefined'){
                          var annotation = $scope.annotationArray[curpage][i];
                          console.log("annotation add")
                          anno.addAnnotation(annotation);
                        }
                        else{
                          throw "Out of annotations to grab"
                        }
                      }
                    }
                    catch(err){
                      console.log(err);
                    }
               
                }
                image.src = canvas.toDataURL('image/jpeg'); 

          });
          

    });
    }
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
      $scope.loadingIconOn = false;
      $scope.loadingIconOnModal = false;
      $scope.uploadMutex = false;
      $scope.categoryList = [];
      $scope.myOrderBy = "date";
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