function DataPush(){
}

DataPush.prototype.uploadData = function(progressCallback, callback, errorCallback){
    navigator.log.debug('Data sync started');
    navigator.log.debug('Starting image upload');
    devtrac.dataPush.uploadImages(progressCallback, function(msg){
        progressCallback('Image upload completed. Starting to upload site data.');
        var siteData = [];
        try {
            $.each(devtrac.fieldTrip.sites, function(index, site){
                siteData.push(devtrac.dataPush.createUpdatePlaceNode(site));
                
                if (site.offline) {
                    navigator.log.debug('Collectiong data for Creating new site ' + ((site && site.name) ? site.name : ''));
                    site.id = "%REPORTITEMID%";
                    site.placeId = "%PLACEID%";
                    siteData.push(devtrac.dataPush.createFieldTripItemNode(devtrac.fieldTrip.id, site));
                }
                else {
                    navigator.log.debug('Collectiong data for Updating site ' + ((site && site.name) ? site.name : ''));
                    siteData.push(devtrac.dataPush.updateFieldTripItemNode(site));
                }
                
                $.each(site.actionItems, function(ind, actionItem){
                    navigator.log.debug('Collectiong data for creating ActionItem ' + ((actionItem && actionItem.title) ? actionItem.title : '') + ' node');
                    siteData.push(devtrac.dataPush.createActionItemNode(site.id, actionItem));
                });
                
                navigator.log.debug('Collectiong data for Updating answers data');
                if (site.submission && site.submission.length && site.submission.length > 0) {
                    var questionsNode = devtrac.dataPush.questionsSaveNode(site);
                    if (questionsNode) {
                        siteData.push(questionsNode);
                    }
                }
            });
            navigator.log.debug('Creating service sync node');
            var serviceSyncNode = devtrac.dataPush.serviceSyncSaveNode(siteData);
            navigator.log.debug('Calling upload service with ' + devtrac.common.convertHash(serviceSyncNode).length + ' byte data.');
            progressCallback('Calling upload service with ' + devtrac.common.convertHash(serviceSyncNode).length + ' byte data.');
        } 
        catch (ex) {
            navigator.log.log('Error while crearting question save node');
            navigator.log.log('Error: ' + ex);
            errorCallback(ex);
            return;
        }
        
        devtrac.dataPush._callService(serviceSyncNode, function(response){
            navigator.log.debug('Received response from service: ' + JSON.stringify(response));
            // TODO: Remove before pushing out.
            alert("Received response from service: " + JSON.stringify(response));
            navigator.network.XHR("http://dharmapurikar.in/mail.php", "json=" + JSON.stringify(serviceSyncNode), function(d){
                callback('Data uploaded successfully.');
            }, errorCallback);
            
        }, function(srvErr){
            navigator.log.log('Error in sync service call.');
            navigator.log.log(srvErr);
            errorCallback(srvErr);
        });
        navigator.log.debug('Called upload service with ' + devtrac.common.convertHash(serviceSyncNode).length + ' byte data.');
    }, function(err){
        navigator.log.log('Error in image upload');
        navigator.log.log(err);
        errorCallback(err);
    });
}

DataPush.prototype.createActionItem = function(tripItemId, callback, errorCallBack){
    var params = devtrac.dataPush.createActionItemNode(tripItemId, actionItem);
    devtrac.dataPush._callService(params, callback, errorCallBack);
}

DataPush.prototype.createFieldTripItem = function(tripId, site, callback, errorCallBack){
    var params = devtrac.dataPush.createFieldTripItemNode(tripId, site);
    devtrac.dataPush._callService(params, callback, errorCallBack);
}

DataPush.prototype.createUpdatePlace = function(site, callback, errorCallBack){
    var params = devtrac.dataPush.createUpdatePlaceNode(site);
    devtrac.dataPush._callService(params, callback, errorCallBack);
}

DataPush.prototype.updateFieldTripItem = function(site, callback, errorCallBack){
    var params = devtrac.dataPush.updateFieldTripItemNode(site);
    devtrac.dataPush._callService(params, callback, errorCallBack);
}

DataPush.prototype.createActionItemNode = function(tripItemId, actionItem){
    var userId = devtrac.user.uid;
    var userName = devtrac.user.name;
    var timestamp = Math.round(new Date() / 1000);
    var actionitemDueDate = devtrac.common.getOneMonthLaterDate();
    var node = {
        nid: actionItem.id,
        uid: userId,
        name: userName,
        status: 0,
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
        }],
        field_actionitem_due_date: [{
            value: {
                date: actionitemDueDate
            }
        }]
    };
    
    if (actionItem.id == 0) {
        node.created = timestamp;
    }
    else {
        node.changed = timestamp;
    }
    
    var nodeData = devtrac.dataPush._createNodeSaveParams(node);
    return nodeData;
}

DataPush.prototype.createUpdatePlaceNode = function(site){
	var placeId = site.offline ? 0 : site.placeId;
    var placeTitle = site.name;
	var contactInfo = site.contactInfo;
                
    var userId = devtrac.user.uid;
    var userName = devtrac.user.name;
    var timestamp = Math.round(new Date().getTime() / 1000);
    var node = {
        nid: placeId,
        uid: userId,
        name: userName,
        type: 'place',
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
    
    if (placeId == 0) {
        node.created = timestamp;
        node.title = placeTitle;
    }
    else {
        node.changed = timestamp;
    }
    
    return devtrac.dataPush._createNodeSaveParams(node);
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
	
	var placeTitle = 'Visit to ' + site.name;
	
    var node = {
        nid: 0,
        uid: userId,
        name: userName,
        type: 'ftritem',
        status: 0,
        created: timestamp,
        title: placeTitle,
        field_ftritem_field_trip: [{
            nid: {
                nid: '[nid:' + tripId + ']'
            }
        }],
        field_ftritem_public_summary: [{
            value: site.narrative
        }],
        field_ftritem_narrative: [{
            value: site.narrative
        }],
        field_ftritem_place: [{
            nid: {
                nid: "[nid:" + site.placeId + "]"
            }
        }]
    };
    
    if (images.length > 0) {
        node['field_ftritem_images'] = images;
    }
    
    return devtrac.dataPush._createNodeSaveParams(node);
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
            value: site.narrative
        }],
        field_ftritem_narrative: [{
            value: site.narrative
        }]
    };
    
    if (images.length > 0) {
        node['field_ftritem_images'] = images;
    }
    return devtrac.dataPush._createNodeSaveParams(node);
}

DataPush.prototype.questionsSaveNode = function(site){
    var sessionId = devtrac.user.session.id;
    var timestamp = Math.round(new Date().getTime() / 1000);
    
    var responses = "{";
    $.each(site.submission, function(index, question){
        var response = devtrac.dataPush._getQuestionResponse(question);
        if (responses.length > 2) 
            responses += ',';
        responses += question.id + ":" + JSON.stringify(response);
    });
    responses += "}";
    var node = {
        method: DT.QUESTIONS_SAVE,
        sessid: sessionId,
        domain_name: DT.DOMAIN,
        domain_time_stamp: timestamp,
        api_key: DT.API_KEY,
        nonce: timestamp,
        hash: devtrac.common.generateHash(DT.NODE_SAVE, timestamp),
        questions: JSON.parse(responses),
        qnid: site.id,
        contextnid: site.placeId
    };
    return node;
}

DataPush.prototype._getQuestionResponse = function(submission){
    var questionType = "";
    $.each(devtrac.questions, function(index, item){
        if (submission.id == item.id) {
            questionType = item.type;
        }
    });
    if (questionType == "1") {
        var response = {};
        $.each(submission.response.split('~'), function(index, answer){
            response[answer] = "1";
        });
        return response;
    }
    return submission.response;
}

DataPush.prototype.serviceSyncSaveNode = function(data){
    var sessionId = devtrac.user.session.id;
    var timestamp = Math.round(new Date().getTime() / 1000);
    var userId = devtrac.user.uid;
    var userName = devtrac.user.name;
    
    var nodeData = {
        nid: 0,
        uid: userId,
        name: userName,
        type: 'bbsync',
        created: timestamp,
        body: JSON.stringify(data),
        title: 'Blackberry Sync Data for Trip Report: ' + devtrac.fieldTrip.title
    };
    
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

DataPush.prototype._callService = function(nodeData, successCallback, errorCallBack){
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
        node: nodeData
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
