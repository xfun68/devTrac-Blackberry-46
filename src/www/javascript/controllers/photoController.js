function PhotoController(){

}

PhotoController.prototype.show = function(){
    var container = $("#photo_list");
    container.html("");
    $.each(devtrac.currentSite.photos, function(index, item){
        container.append("<li><img class='thumbnail' src='" + item + "'/></li>");
    });
    screens.show("photo");
}

PhotoController.prototype.attach = function(){
    var photo = $("#photo_path");
    if (photo.val()) {
		alert("Reading "+ photo.val());
		navigator.file.read(photo.val(), function(data){
						        alert(data);
						    }, function(){
						        alert("Could not read data");
						    });

//		var reader = new FileReader();
//		reader.onload = function(evt) {
//		    console.log(evt.target.result);
//		};
//		reader.onerror= function(evt) {
//		    console.log(evt.target.error.code);
//		};
		
//		reader.readAsDataURL(photo.val());
        /*devtrac.currentSite.photos.push(photo.val());
        var photos = $.unique(devtrac.currentSite.photos);
        devtrac.currentSite.photos = photos;
        photo.val("");
        devtrac.dataStore.saveCurrentSite(function(){
            alert("Image attached successfully.")
            devtrac.photoController.show();
        });*/
    }
}
