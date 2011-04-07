function PhotoController(){

}

PhotoController.prototype.show = function(){
	var container = $("#photo_list");
    container.html("");
    $.each(devtrac.currentSite.photos, function(filePath, fid){
        container.append("<li><img class='thumbnail' src='" + filePath + "_'/></li>");
    });
    screens.show("photo");
}

PhotoController.prototype.attach = function(){
    var photo = $("#photo_path");
    if (photo.val()) {
		navigator.image.resize(photo.val(), 640, 480, function(path){
				devtrac.currentSite.photos[path]=null;
				devtrac.dataStore.saveCurrentSite(function(){
					alert("Image attached successfully.")
					devtrac.photoController.show();
				});
		},function(err){
			alert('Failed to attach image.');
		})
		photo.val("");
    }
}
