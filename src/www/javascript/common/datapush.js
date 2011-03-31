function DataPush(){
}

DataPush.prototype.uploadData = function(progressCallback, callback){
	devtrac.dataPush.uploadImages(progressCallback, function(msg){
		progressCallback(msg);
		callback('Data uploaded successfiully');
	});
}

DataPush.prototype.uploadImages = function(progressCallback, callback){
	progressCallback("Starting image upload");
    var filesToUpload = [];
	$.each(devtrac.fieldTrip.sites, function(index, site){
	   for (var filePath in site.photos) {
	        if (!site.photos[filePath]) {
	            filesToUpload.push(filePath);
	        }
		}
    });
    var totalImages = filesToUpload.length;
	if(totalImages == 0){
		callback('No files to upload or all files are already uploaded.');
		return;
	}
	
	devtrac.photoUpload.uploadMultiple(filesToUpload, function(uploadedFiles){
		callback("Images uploaded and saved successfully.");
    }, function(uplaodedFiles, lastUploaded, lastFid){
		var imagesUploadCount = 0;
		for (var filePath in uplaodedFiles) imagesUploadCount++;
		progressCallback(imagesUploadCount + " of "+ totalImages +" images uploaded.");
		devtrac.dataStore.updateTripImageFid(lastUploaded, lastFid, function(msg){
			progressCallback(msg);
		});
    });
}