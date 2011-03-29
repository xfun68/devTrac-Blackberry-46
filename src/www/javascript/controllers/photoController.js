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
/*
name,size,mimeType,lastModified,data ,devtrac.user.loggedIn

'method' = 'file.save'
'file' => $filedata,
'filename'=> $imgfile,
'filesize'=> $filesize,
'timestamp'=> $timestamp,
'uid'=> $uid,
'filemime'=> $mimetype
 * */
PhotoController.prototype.attach = function(){
    var photo = $("#photo_path");
    if (photo.val()) {
		alert("Reading "+ photo.val());
		navigator.file.read(photo.val(), function(data){
						        alert(JSON.stringify(data));
								
								var dataToPost = 
								{
									file: data.data,
									filename: data.Name,
									filesize: data.size,
									timestamp: data.lastModified,
									uid: devtrac.user.loggedIn,
									filemime: data.mimeType
								};
								
								    var sessionId = devtrac.user.session.id;
								    var timestamp = Math.round(new Date().getTime() / 1000);
								    var params = {
										method: 'file.save',
										sessid: sessionId,
										domain_name: DT.DOMAIN,
										domain_time_stamp: timestamp,
										api_key: DT.API_KEY,
										nonce: timestamp,
										hash: generateHash('file.save', timestamp),
										file: dataToPost
									};
								
								
								callService(params, function(res){
									alert(JSON.stringify(res));
								}, function(err){
									alert(JSON.stringify(err));
								});
								
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
