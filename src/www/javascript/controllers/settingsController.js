function SettingsController(){

}

SettingsController.prototype.show = function(){
    screens.show("settings");
}

SettingsController.prototype.updateQuestionsPlaces = function(){
    devtrac.dataPull.questions(function(){
        alert("Questions and places updated successfully.");
        devtrac.settingsController.show();
    });
}

SettingsController.prototype.wipeout = function(){
    screens.show("delete_confirm");
}

SettingsController.prototype.performWipeout = function(){
    navigator.store.nuke(function(){
        alert("All application data deleted.");
        navigator.utility.exit();
    }, function(){
        alert("Error occured while deleting application data.")
        devtrac.settingsController.show();
    });
}

SettingsController.prototype.uploadTripImages = function(){
	$('#images_upload_progress').html("Starting image upload");
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
		alert('No files to upload or all files are already uploaded.');
		$('#images_upload_progress').html("");
		return;
	}
	
	devtrac.photoUpload.uploadMultiple(filesToUpload, function(uploadedFiles){
        $.each(devtrac.fieldTrip.sites, function(index, site){
	   		for (var filePath in site.photos) {
				$('#images_upload_progress').html(filePath + ":"+index + ":" + devtrac.fieldTrip.sites.length);
				//site.photos[fileName] = uploadedFiles[fileName];
			}
        });
		
		$('#images_upload_progress').html("");
//		devtrac.dataStore.saveFieldTrip(function(){
//			alert("Images uploaded successfully.")
//		});
    }, function(uplaodedFiles, lastUploaded){
		var imagesUploadCount = 0;
		for (var filePath in uplaodedFiles) imagesUploadCount++;
        $('#images_upload_progress').html(imagesUploadCount + " of "+ totalImages +" images uploaded." + lastUploaded + " uploaded last.");
    });
}
