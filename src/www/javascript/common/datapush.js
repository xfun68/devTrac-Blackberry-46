function DataPush(){
}

DataPush.prototype.uploadData = function(progressCallback, callback){
    //    devtrac.dataPush.createFieldTripItem(devtrac.fieldTrip.id, function(msg, id){
    //    	devtrac.dataPush.createActionItem(id,function(msg3, id3){
    //				callback(msg3);
    //			});
    
    devtrac.dataPush.uploadImages(progressCallback, function(msg){
        progressCallback(msg);
		devtrac.dataPush.updateFieldTripItem(devtrac.fieldTrip.sites[0], function(msg2, id2){
           callback('Data uploaded successfiully'); 
        });
    });
}

DataPush.prototype.createActionItem = function(tripItemId, callback){
    var userId = devtrac.user.uid;
    var userName = devtrac.user.name;
    var timestamp = Math.round(new Date().getTime() / 1000);
    var node = {
        nid: 0,
        uid: userId,
        name: userName,
        status: 0,
        created: timestamp,
        type: 'actionitem',
        title: 'Some remote Action Item',
        field_actionitem_ftreportitem: [{
            nid: {
                nid: '[nid:' + tripItemId + ']'
            }
        }],
        field_actionitem_followuptask: [{
            value: 'Test action item task details'
        }],
        field_actionitem_responsible: [{
            uid: {
                uid: userName
            }
        }],
        field_actionitem_status: [{
            value: 1
        }],// 1 = Open 2 = Rejected 3 = Closed
        field_actionitem_due_date: [{
            value: {
                date: "15/04/2011"
            }
        }]
    };
    alert('Node:' + JSON.stringify(node));
    var params = devtrac.dataPush._createNodeSaveParams(node);
    devtrac.common.callService(params, function(data){
        callback('Success :' + JSON.stringify(data), data['#data']);
    }, function(data){
        callback('Failed ' + data);
    });
}

DataPush.prototype.createFieldTripItem = function(tripId, callback){
    var userId = devtrac.user.uid;
    var userName = devtrac.user.name;
    var timestamp = Math.round(new Date().getTime() / 1000);
    var node = {
        nid: 0,
        uid: userId,
        name: userName,
        type: 'ftritem',
        status: 0,
        created: timestamp,
        title: 'My remote fieldtrip',
        field_ftritem_field_trip: [{
            nid: {
                nid: '[nid:' + tripId + ']'
            }
        }],
        field_ftritem_public_summary: [{
            value: 'This field is mandatory'
        }],
        field_ftritem_narrative: [{
            value: 'The full report. this field is mandatory'
        }]
    };
    
    var params = devtrac.dataPush._createNodeSaveParams(node);
    devtrac.common.callService(params, function(data){
        callback('Success :' + JSON.stringify(data), data['#data']);
    }, function(data){
        callback('Failed ' + data);
    });
}

DataPush.prototype.updateFieldTripItem = function(site, callback){
    var userId = devtrac.user.uid;
    var userName = devtrac.user.name;
    var timestamp = Math.round(new Date().getTime() / 1000);
	var images = [];
	for(var photo in site.photos){
		var image = {fid:site.photos[photo], data:{description:''}};
		images.push(image);
	}
    var node = {
        nid: site.id,
        uid: userId,
        name: userName,
        type: 'ftritem',
        changed: timestamp,
        title: site.name,
        field_ftritem_public_summary: [{
            value: "Some Value"
        }],
        field_ftritem_narrative: [{
            value: site.narrative
        }],
		field_ftritem_images:images
    };
    
    var params = devtrac.dataPush._createNodeSaveParams(node);
    
    devtrac.common.callService(params, function(data){
        callback('Success :' + JSON.stringify(data), data['#data']);
    }, function(data){
        callback('Failed ' + data);
    });
}

DataPush.prototype._createNodeSaveParams = function(nodeData){
    var sessionId = devtrac.user.session.id;
    var timestamp = Math.round(new Date().getTime() / 1000);
    
    return {
        method: DT.NODE_SAVE,
        sessid: sessionId,
        domain_name: DT.DOMAIN,
        domain_time_stamp: timestamp,
        api_key: DT.API_KEY,
        nonce: timestamp,
        hash: devtrac.common.generateHash(DT.NODE_SAVE, timestamp),
        node: JSON.stringify(nodeData)
    };
}

DataPush.prototype.uploadImages = function(progressCallback, callback){
    progressCallback("Starting image upload");
    var filesToUpload = [];
	var boolHasImages = false;
    $.each(devtrac.fieldTrip.sites, function(index, site){
        for (var filePath in site.photos) {
			boolHasImages = true;
            if (!site.photos[filePath]) {
                filesToUpload.push(filePath);
            }
        }
    });
    var totalImages = filesToUpload.length;
    if (totalImages == 0) {
        callback((boolHasImages ? 'All images are already uploaded.' : 'No image to upload.'));
        return;
    }
    
    devtrac.photoUpload.uploadMultiple(filesToUpload, function(uploadedFiles){
        callback("Images uploaded and saved successfully.");
    }, function(uplaodedFiles, lastUploaded, lastFid){
        var imagesUploadCount = 0;
        for (var filePath in uplaodedFiles) 
            imagesUploadCount++;
        progressCallback(imagesUploadCount + " of " + totalImages + " images uploaded.");
        devtrac.dataStore.updateTripImageFid(lastUploaded, lastFid, function(msg){
            progressCallback(msg);
        });
    });
}
