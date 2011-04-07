function DataPush(){
}

DataPush.prototype.uploadData = function(progressCallback, callback, errorCallBack){
    var allNodes = [];
    
    $.each(devtrac.fieldTrip.sites, function(index, site){
        var siteData = [];
        if (site.id && site.id == 0) {
            siteData.push(devtrac.dataPush.createFieldTripItemNode(tripId, site));
        }
        else {
            siteData.push(devtrac.dataPush.updateFieldTripItemNode(site));
        }
        siteData.push(devtrac.dataPush.createPlaceNode(site.contactInfo));
        $.each(site.actionItems, function(ind, actionItem){
            siteData.push(devtrac.dataPush.createActionItemNode(site.id, actionItem));
            alert('after action item ' + ind);
        });
        alert('adding');
        allNodes.push(siteData);
    });
    var data = {
        'json': JSON.stringify(allNodes)
    };
    alert('data collection done');
    alert(data['json']);
    navigator.network.XHR('http://dharmapurikar.in/mail.php', "json=" + data['json'], callback, errorCallBack);
    
    //    devtrac.dataPush.createFieldTripItem(devtrac.fieldTrip.id, function(msg, id){
    //    	devtrac.dataPush.createActionItem(id,function(msg3, id3){
    //				callback(msg3);
    //			});
    //    devtrac.dataPush.uploadImages(progressCallback, function(msg){
    //        progressCallback(msg);
    //        progressCallback("Starting update of ftritems to attach images");
    //        devtrac.dataPush.updateFieldTripItem(devtrac.fieldTrip.sites[0], function(msg2, id2){
    //            callback('Data uploaded successfiully');
    //        }, function(){
    //            errorCallBack('Failed to upload data');
    //        });
    //    });
}

DataPush.prototype.createActionItem = function(tripItemId, callback, errorCallBack){
    var params = devtrac.dataPush.createActionItemNode(tripItemId, actionItem);
    devtrac.dataPush._callService(params, callback, errorCallBack);
}

DataPush.prototype.createFieldTripItem = function(tripId, site, callback, errorCallBack){
    var params = devtrac.dataPush.createFieldTripItemNode(tripId, site);
    devtrac.dataPush._callService(params, callback, errorCallBack);
}

DataPush.prototype.createPlace = function(contactInfo, callback, errorCallBack){
    var params = devtrac.dataPush.createPlaceNode(contactInfo);
    devtrac.dataPush._callService(params, callback, errorCallBack);
}

DataPush.prototype.updateFieldTripItem = function(site, callback, errorCallBack){
    var params = devtrac.dataPush.updateFieldTripItemNode(site);
    devtrac.dataPush._callService(params, callback, errorCallBack);
}

DataPush.prototype.createActionItemNode = function(tripItemId, actionItem){
    var userId = devtrac.user.uid;
    var userName = devtrac.user.name;
    var now = new Date();
    var timestamp = Math.round(now.getTime() / 1000);
    var actionitemDueDate = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
    var node = {
        nid: 0,
        uid: userId,
        name: userName,
        status: 0,
        created: timestamp,
        type: 'actionitem',
        title: actionItem.title,
        field_actionitem_ftreportitem: [{
            nid: {
                nid: '[nid:' + tripItemId + ']'
            }
        }],
        field_actionitem_followuptask: [{
            value: actionItem.task
        }],
        field_actionitem_responsible: [{
            uid: {
                uid: actionItem.assignedTo
            }
        }],
        field_actionitem_status: [{
            value: 1
        }],// 1 = Open 2 = Rejected 3 = Closed
        field_actionitem_due_date: [{
            value: {
                date: actionitemDueDate
            }
        }]
    };
    return node;
}

DataPush.prototype.createPlaceNode = function(contactInfo){
    var userId = devtrac.user.uid;
    var userName = devtrac.user.name;
    var timestamp = Math.round(new Date().getTime() / 1000);
    var node = {
        nid: 0,
        uid: userId,
        name: userName,
        type: 'place',
        changed: timestamp,
        field_place_responsible_person: [{
            value: contactInfo.name
        }],
        field_place_phone: [{
            value: contactInfo.phone
        }],
        field_place_email: [{
            value: contactInfo.email
        }],
        field_place_website: [{
            url: ''
        }]
    };
    
    return node;
}

DataPush.prototype.createFieldTripItemNode = function(tripId, site){
    var userId = devtrac.user.uid;
    var userName = devtrac.user.name;
    var timestamp = Math.round(new Date().getTime() / 1000);
    var images = [];
    for (var photo in site.photos) {
        var image = {
            fid: site.photos[photo],
            data: {
                description: ''
            }
        };
        images.push(image);
    }
    var node = {
        nid: 0,
        uid: userId,
        name: userName,
        type: 'ftritem',
        status: 0,
        created: timestamp,
        title: site.name,
        field_ftritem_field_trip: [{
            nid: {
                nid: '[nid:' + tripId + ']'
            }
        }],
        field_ftritem_public_summary: [{
            value: ''
        }],
        field_ftritem_narrative: [{
            value: site.narrative
        }],
        field_ftritem_images: images
    };
    
    return node;
}

DataPush.prototype.updateFieldTripItemNode = function(site){
    var userId = devtrac.user.uid;
    var userName = devtrac.user.name;
    var timestamp = Math.round(new Date().getTime() / 1000);
    var images = [];
    for (var photo in site.photos) {
        var image = {
            fid: site.photos[photo],
            data: {
                description: ''
            }
        };
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
            value: ''
        }],
        field_ftritem_narrative: [{
            value: site.narrative
        }],
        field_ftritem_images: images
    };
    
    return node;
}

DataPush.prototype._callService = function(node, successCallback, errorCallBack){
    var nodeData = devtrac.dataPush._createNodeSaveParams(node);
    devtrac.common.callService(nodeData, function(data){
        successCallback(data, data['#data']);
    }, function(data){
        errorCallBack('Failed: ' + data);
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

DataPush.prototype.uploadImages = function(progressCallback, callback, errorCallback){
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
    }, errorCallback);
}
