var app = angular.module('CmpeSVSApp');

app.controller('assistDocPrepCtrl',  ['$scope','$http', '$sce', function($scope,$http,$sce) {
		var init = function(){
  //
  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.
  //
  var url = "/static/partials/compressed.tracemonkey-pldi-09.pdf";
  //
  // Disable workers to avoid yet another cross-origin issue (workers need
  // the URL of the script to be loaded, and dynamically loading a cross-origin
  // script does not work).
  //
  // PDFJS.disableWorker = true;
  //
  // The workerSrc property shall be specified.
  //
  PDFJS.workerSrc = "/static/javascript/adp-js/pdf.worker.js";
  //
  // Asynchronous download PDF
  //
  PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {
    //
    // Fetch the first page
    //
    console.log("Number of pages is " + pdf.numPages);
    pdf.getPage(1).then(function getPageHelloWorld(page) {
      var scale = 1.5;
      var viewport = page.getViewport(scale);
      //
      // Prepare canvas using PDF page dimensions
      //
      var canvas = document.getElementById('the-canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      //
      // Render PDF page into canvas context
      //
      var callback = function(){
      	  var canvas = document.getElementById('the-canvas');
      	  var image = document.getElementById('pdfview');
      	  image.src = canvas.toDataURL();
      	  anno.makeAnnotatable(document.getElementById('pdfview'));
      };
      var renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      var task = page.render(renderContext);
      task.promise.then(function(){
      		  var canvas = document.getElementById('the-canvas');
      	  var image = document.getElementById('pdfview');
      	  image.src = canvas.toDataURL('image/jpeg');
      	  anno.makeAnnotatable(document.getElementById('pdfview'));
      });
    });
  });
		};

		init();
		
}]);