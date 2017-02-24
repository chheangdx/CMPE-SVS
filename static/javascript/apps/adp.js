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