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
$('#file')[0].onchange = function () {
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
};