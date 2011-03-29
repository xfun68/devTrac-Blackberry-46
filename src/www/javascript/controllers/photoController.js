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
        var sessionId = devtrac.user.session.id;
        var timestamp = Math.round(new Date().getTime() / 1000);
        var params = {
            method: DT.FILE_SAVE,
            sessid: sessionId,
            domain_name: DT.DOMAIN,
            domain_time_stamp: timestamp,
            api_key: DT.API_KEY,
            nonce: timestamp,
            hash: devtrac.common.generateHash(DT.FILE_SAVE, timestamp)
        }
        navigator.network.XHRUpload(DT.SERVICE_ENDPOINT, devtrac.common.convertHash(params), photo.val(), devtrac.user.uid, "sites/default/files/blackberry/" + devtrac.user.uid, function(response){
            alert(JSON.stringify(response));
        });
        //		devtrac.currentSite.photos.push(photo.val());
        //		var photos = $.unique(devtrac.currentSite.photos);
        //		devtrac.currentSite.photos = photos;
        //		photo.val("");
        //		devtrac.dataStore.saveCurrentSite(function(){
        //		alert("Image attached successfully.")
        //		devtrac.photoController.show();
        //		});
    }
}
