function PhotoUpload(){
}

PhotoUpload.prototype.upload = function(filePath, successCallback){
    var sessionId = devtrac.user.session.id;
    var userId = devtrac.user.uid;
    var timestamp = Math.round(new Date().getTime() / 1000);
    var fileUploadPath = DT.FILE_UPLOAD_PATH.replace('<UID>', userId)
    var params = {
        method: DT.FILE_SAVE,
        sessid: sessionId,
        domain_name: DT.DOMAIN,
        domain_time_stamp: timestamp,
        api_key: DT.API_KEY,
        nonce: timestamp,
        hash: devtrac.common.generateHash(DT.FILE_SAVE, timestamp)
    }
    var paramsHash = devtrac.common.convertHash(params);
    navigator.network.XHRUpload(DT.SERVICE_ENDPOINT, paramsHash, filePath, userId, fileUploadPath, function(response){
	        successCallback(response["#data"]);
	    });
}

PhotoUpload.prototype.uploadMultiple = function(filePaths, successCallback, progressCallback){
	devtrac.photoUpload._uploadInternal(filePaths, {}, successCallback, progressCallback);
}

PhotoUpload.prototype._uploadInternal = function(filePaths, uploadedFiles, successCallback, progressCallback){
	var fileToUpload = filePaths.pop();
	if(fileToUpload){
		devtrac.photoUpload.upload(fileToUpload,function(fid){
			uploadedFiles[fileToUpload] = fid;
			if(progressCallback)
				progressCallback(uploadedFiles,fileToUpload);
			devtrac.photoUpload._uploadInternal(filePaths, uploadedFiles, successCallback, progressCallback);
		});
	} else {
		successCallback(uploadedFiles);
	}
}