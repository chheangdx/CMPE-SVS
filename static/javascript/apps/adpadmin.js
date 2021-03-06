var app = angular.module('CmpeSVSApp');

app.controller('assistDocPrepAdminCtrl',  ['$scope','$http', '$filter', function($scope,$http,$filter) {
   
    $scope.numberOfPages=function(){
        return Math.ceil($scope.documentNameList.length/$scope.pageSize);                
    }

    $scope.addCategory = function(){
      //if a category is in the list already, don't continue
     $scope.loadingIconOnModal = true;
      if($scope.categoryList.indexOf($scope.categoryInput) == -1) {
        
        var data = {'category' : $scope.categoryInput}
        $http({
            method : 'post',
            url : '/addCategory',
            data: data
        }).then(function successCallback(response) {
          $scope.loadingIconOnModal = false;
          $scope.categoryList = response.data['categoryList']
          $('#addCategory').modal('hide');
          $scope.categoryInput = ""
        }, function errorCallback(response) {
          $scope.loadingIconOnModal = false;
          console.log("HTTP Category List Response failed: " + response);
        });      

        }
        else{
          $scope.loadingIconOnModal = false;
          console.log("category already in list")
        }  
    };

    //delete a document from the backend
    $scope.adminDeleteDocument = function(doc){
      var data  = {
      'username' : doc.username,
      'documentName' : doc.documentName
    };
    $http({
          method : 'post',
          url : '/adminDeleteDocument',
          data : data
      }).then(function successCallback(response) {
        $scope.adminGetDocumentList();
      }, function errorCallback(response) {
        console.log("HTTP deleteDocument Response failed: " + response);
    });        
   }

    $scope.deleteCategory = function(){
      var data = {'category' : $scope.selectedRemoveCategory}
      $scope.loadingIconOnModal = true;
      $http({
          method : 'post',
          url : '/deleteCategory',
          data: data
      }).then(function successCallback(response) {
        $scope.loadingIconOnModal = false;
        $scope.categoryList = response.data['categoryList']
        $('#removeCategory').modal('hide');
        $scope.selectedRemoveCategory = ""
      }, function errorCallback(response) {
        $scope.loadingIconOnModal = false;
        console.log("HTTP Category List Response failed: " + response);
      });        
    };

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
      $scope.doccer = docObject;
      $scope.documentName = docObject.documentName;
      $scope.status = docObject.status;
      $scope.statusNewChoice = docObject.status
      $scope.selectedNewCategory = docObject.category
      $scope.adminGetDocument(docObject);
    }

//get list of documents specific to user
   $scope.adminGetDocumentList = function(){

      $http({
          method : 'post',
          url : '/adminGetDocumentList'
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
   $scope.adminGetDocument = function(docObject){
    var data = {
      'documentName' : docObject.documentName, //Change this later to be selected value from doc
      'username' : docObject.username,
      'category' : "blankuuuu"
    }

    if($scope.status == "Incomplete"){
      $http({
        method : 'post',
        url : '/adminSaveDocumentName',
        data : data
      }).then(function successCallback(response) {
        $scope.documentGrab("/adminGetDocument");   

      }, function errorCallback(response) {
        $scope.loadingIconOn = false;
        console.log("HTTP File Response failed: " + response);
      });   
    }
    else{
      $http({
        method : 'post',
        url : '/adminSaveAnnotatedDocumentName',
        data : data
      }).then(function successCallback(response) {
      $scope.documentGrab("/adminGetAnnotatedDocument");   

      }, function errorCallback(response) {
        $scope.loadingIconOn = false;
        console.log("HTTP File Response failed: " + response);
      });   
    }  
   }

//save a document with annotations to backend. admin function
$scope.saveAnnotatedDocument = function(){
    $scope.loadingIconOn = true;
    $scope.annotationArray[$scope.currentPage-1] = anno.getAnnotations();
    var data  = {
      'documentName' : $scope.documentName,
      'username' : $scope.doccer.username,
      'annotations': $scope.annotationArray,
      'status' : $scope.statusNewChoice,
      'category' : $scope.selectedNewCategory
    };
    $http({
          method : 'post',
          url : '/saveAnnotatedDocument',
          data : data
      }).then(function successCallback(response) {
        $scope.loadingIconOn = false;
        $scope.adminGetDocumentList();
      }, function errorCallback(response) {
        $scope.loadingIconOn = false;
        console.log("HTTP saveAnnotatedDocumentName Response failed: " + response);
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
                  console.log("Making Annotation");
                  
                  console.log("Annotation complete");
                  //adding previous annotation block
                  if(!begin){
                    curpage = $scope.currentPage-1
                  }
                  else{
                    curpage = 0
                  }
                  console.log("leng:"+$scope.annotationArray[curpage]+"\n")

                  $scope.docUp = false;
                  $scope.borderStyle = {'border':'1px solid black'}
                  $scope.loadingIconOn = false;
                  $scope.$apply();
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
                      console.log("No annotations available");
                    }

                }
                image.src = canvas.toDataURL('image/jpeg');
                console.log("Image Loaded");         
          });
        });
    }
    else
    {
      $scope.loadingIconOn = false;      
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
              url : '/adminGetAnnotations',
              data : data
          }).then(function successCallback(response) {
            $scope.annotationArray = response.data['documentAnnotation'];
            $scope.pageGrab(1, true); //true because this is the beginning
          }, function errorCallback(response) {
            $scope.loadingIconOn = false;
            console.log("HTTP getAnnotations Response failed: " + response);
        });
      }        
    }

   var init = function(){
      $scope.uploadMutex = false;
      $scope.loadingIconOn = false;
      $scope.loadingIconOnModal = false;
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.categoryList = [];
      $scope.myOrderBy = "date";
      $scope.reverse = false;
      $scope.docUp = true;
      $scope.getCategory();
      $scope.doccer={
        username:" ",
        uploadDate:""
    }
      $scope.choiceList = [
        'Incomplete',
        'Reviewed'
      ]
      try{
        $scope.adminGetDocumentList();
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

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});