function PhotoController(){

}

PhotoController.prototype.show = function(){
	var container = $("#photo_list");
    container.html("");
    $.each(devtrac.currentSite.photos, function(filePath, fid){
        container.append("<li><img class='thumbnail' src='" + filePath + "'/></li>");
    });
    screens.show("photo");
}

PhotoController.prototype.attach = function(){
    var photo = $("#photo_path");
    if (photo.val()) {
		devtrac.currentSite.photos[photo.val()]=null;
		photo.val("");
		devtrac.dataStore.saveCurrentSite(function(){
			alert("Image attached successfully.")
			devtrac.photoController.show();
		});
    }
}
