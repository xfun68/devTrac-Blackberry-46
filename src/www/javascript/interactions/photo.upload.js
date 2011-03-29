function PhotoUpload(){
}

PhotoUpload.prototype.upload = function(filePath, successCallback, failedCallback){	
	navigator.file.read(filePath, function(fileData){
		var sessionId = devtrac.user.session.id;
		var loggedInUser = devtrac.user.uid;
	    var timestamp = Math.round(new Date().getTime() / 1000);
		var fileParams = {
			file: fileData.data,
	        filename: fileData.name,
	        filesize: fileData.size,
	        timestamp: fileData.lastModified,
	        uid: loggedInUser,
	        filemime: fileData.mimeType,
			filepath: DT.FILE_UPLOAD_PATH.replace('<UID>', loggedInUser).replace('<FILE>',fileData.name)
		};
		
	    var params = {
	        method: DT.FILE_SAVE,
	        sessid: sessionId,
	        domain_name: DT.DOMAIN,
	        domain_time_stamp: timestamp,
	        api_key: DT.API_KEY,
	        nonce: timestamp,
	        hash: devtrac.common.generateHash(DT.FILE_SAVE, timestamp),
			file: JSON.stringify(fileParams)
	    };

	    devtrac.common.callService(params, function(data){
			successCallback(data["#data"]);
		}, failedCallback);
	}, function(){
		failedCallback("Could not read file");
    });
}
