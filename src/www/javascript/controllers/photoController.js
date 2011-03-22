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
        devtrac.currentSite.photos.push(photo.val());
        var photos = $.unique(devtrac.currentSite.photos);
        devtrac.currentSite.photos = photos;
        photo.val("");
        devtrac.dataStore.saveCurrentSite(function(){
            alert("Image attached successfully.")
            devtrac.photoController.show();
        });
    }
}
