function DataPull(){
    this.fieldTrip = new FieldTrip();
    this.sites = [];
    this.sitesForActionItems = [];
}

DataPull.prototype.pull = function(callback){
    // For now don't check for reachability. If user is logged in, download all the data.   
    if (devtrac.fieldTrip) {
        callback();
    }
    else {
        devtrac.dataPull.questions(callback);
    }
    
};

DataPull.prototype.questions = function(callback){
    $("#status").html("");
    var questionSuccess = function(questionResponse){
        if (hasError(questionResponse)) {
            alert(getErrorMessage(questionResponse));
            callback();
        }
        else {
            var questions = $.map(questionResponse['#data'], function(item){
                var question = new Question();
                question.id = item.nid;
                question.title = item.title;
                question.type = item.questiontype;
                question.options = item.questionoptions;
                for (var id in item.taxonomy) {
                    var questionTaxonomy = new QuestionTaxonomy();
                    questionTaxonomy.id = id;
                    questionTaxonomy.name = item.taxonomy[id].name;
                    question.taxonomy.push(questionTaxonomy);
                }
                return question;
            });
            
            if (navigator && navigator.store) {
                navigator.store.put(function(){
                    devtrac.dataPull.updateStatus("Saved " + questions.length + " questions successfully.");
                    devtrac.questions = questions;
                    devtrac.dataPull.placeTypes(callback);
                }, function(){
                    devtrac.dataPull.updateStatus("Error in saving questions");
                    callback();
                }, "questions", JSON.stringify(questions));
            }
            else {
                alert("Offline storage unavailable.");
                callback();
            }
        }
    };
    
    var questionFailed = function(){
        // Failed. Continue with callback function.
        callback();
    };
    
    screens.show("pull_status");
    devtrac.dataPull.updateStatus("Retrieving questions from devtrac.");
    devtrac.remoteView.call('api_questions', 'page_1', '', questionSuccess, questionFailed);
}

DataPull.prototype.placeTypes = function(callback){
    var placesSuccess = function(placesResponse){
        if (hasError(placesResponse)) {
            alert(getErrorMessage(placesResponse));
            callback();
        }
        else {
            var places = $.map(placesResponse['#data'], function(item){
                var placeType = new PlaceType();
                placeType.id = item.tid;
                placeType.name = item.term_data_term_hierarchy_name ? item.term_data_term_hierarchy_name : item.term_data_name;
                placeType.parentId = item.term_data_term_hierarchy_tid ? item.term_data_term_hierarchy_tid : item.tid;
                return placeType;
            });
            
            if (navigator && navigator.store) {
                navigator.store.put(function(){
                    devtrac.dataPull.updateStatus("Saved " + places.length + " place types successfully.");
                    devtrac.places = places;
                    devtrac.dataPull.tripDetails(callback);
                }, function(){
                    devtrac.dataPull.updateStatus("Error in saving place types");
                    callback();
                }, "placeTypes", JSON.stringify(places));
            }
            else {
                alert("Offline storage unavailable.");
                callback();
            }
        }
    };
    
    var placesFailed = function(){
        alert("In question failed");
        // Failed. Continue with callback function.
        callback();
    };
    
    screens.show("pull_status");
    devtrac.dataPull.updateStatus("Retrieving location types.");
    devtrac.remoteView.call('api_placetypes', 'page_1', '', placesSuccess, placesFailed);
}

DataPull.prototype.tripDetails = function(callback){
    var tripSuccess = function(tripResponse){
        if (hasError(tripResponse)) {
            alert(getErrorMessage(tripResponse));
            callback();
        }
        else {
            devtrac.dataPull.fieldTrip.id = tripResponse["#data"][0]["nid"];
            devtrac.dataPull.fieldTrip.title = tripResponse["#data"][0]["title"];
            devtrac.dataPull.tripSiteDetails(callback);
        }
    };
    
    var tripFailed = function(){
        // Failed. Continue with callback function.
        callback()();
    };
    
    screens.show("pull_status");
    devtrac.dataPull.updateStatus("Retrieving field trip information.");
    devtrac.remoteView.call('api_fieldtrips', 'page_1', '["' + devtrac.user.uid + '"]', tripSuccess, tripFailed);
}

DataPull.prototype.tripSiteDetails = function(callback){
    var siteSuccess = function(siteResponse){
        if (hasError(siteResponse)) {
            alert(getErrorMessage(siteResponse));
            callback();
        }
        else {
            var sites = $.map(siteResponse['#data'], function(item){
                var site = new Site();
                site.id = item.nid;
                site.name = item.title;
                site.placeId = item.field_ftritem_place[0].nid;
                site.narrative = item.field_ftritem_narrative[0].value;
                devtrac.dataPull.sites.push(site);
                return site;
            });
            devtrac.dataPull.fieldTrip.sites = sites;
            if (navigator && navigator.store) {
                navigator.store.put(function(){
                    devtrac.dataPull.updateStatus("Saved '" + devtrac.dataPull.fieldTrip.title + "' successfully.");
                    devtrac.dataPull.placeDetailsForSite(callback);
                }, function(){
                    devtrac.dataPull.updateStatus("Error in saving field trip.");
                    callback();
                }, "fieldTrip", JSON.stringify(devtrac.dataPull.fieldTrip));
            }
            else {
                alert("Offline storage unavailable.");
                callback();
            }
        }
    };
    
    var siteFailed = function(){
        // Failed. Continue with callback function.
        callback();
    };
    
    screens.show("pull_status");
    devtrac.dataPull.updateStatus("Retrieving sites for '" + devtrac.dataPull.fieldTrip.title + "'.");
    
    devtrac.remoteView.call('api_fieldtrips', 'page_2', '["' + devtrac.dataPull.fieldTrip.id + '"]', siteSuccess, siteFailed);
}

DataPull.prototype.placeDetailsForSite = function(callback){
    if (devtrac.dataPull.sites.length == 0) {
        callback();
        return;
    }
    var site = devtrac.dataPull.sites.pop();
    var placeSuccess = function(placeResponse){
        if (hasError(placeResponse)) {
            alert(getErrorMessage(placeResponse));
            callback();
        }
        else {
            var placeDetails = placeResponse["#data"][0];
            site.placeId = placeDetails.nid;
            site.placeName = placeDetails.title;
            site.placeGeo = placeDetails.field_place_lat_long.openlayers_wkt;
            site.placeTaxonomy = [];
            for (var index in placeDetails.taxonomy) {
                var item = placeDetails.taxonomy[index];
                var placeType = devtrac.dataPull.getPlaceTypeFor(item.tid);
                if (placeType) {
                    var placeTaxonomy = new PlaceTaxonomy();
                    placeTaxonomy.id = item.tid;
                    placeTaxonomy.name = item.name;
                    site.type = placeType.name;
                    site.placeTaxonomy.push(placeTaxonomy);
                    break;
                }
            }
            
            $.each(devtrac.dataPull.fieldTrip.sites, function(index, siteFromCollection){
                if (siteFromCollection.id == site.id) {
                    devtrac.dataPull.fieldTrip.sites[index] = site;
                    devtrac.dataPull.sitesForActionItems.push(site);
                    if (devtrac.dataPull.sites.length > 0) {
                        devtrac.dataPull.placeDetailsForSite(callback);
                    }
                    else {
                        navigator.store.put(function(){
                            devtrac.dataPull.updateStatus("Updated '" + devtrac.dataPull.fieldTrip.title + "' with sites successfully.");
                            devtrac.dataPull.actionItemDetailsForSite(callback);
                        }, function(){
                            alert("Error in saving field trip.");
                            callback();
                        }, "fieldTrip", JSON.stringify(devtrac.dataPull.fieldTrip));
                    }
                }
            });
        }
    };
    
    var placeFailed = function(){
        // Failed. Continue with callback function.
        callback();
    };
    
    screens.show("pull_status");
    devtrac.dataPull.updateStatus("Retrieving site details for '" + site.name + "'.");
    devtrac.remoteView.call('api_fieldtrips', 'page_4', '["' + site.id + '"]', placeSuccess, placeFailed);
}


DataPull.prototype.actionItemDetailsForSite = function(callback){
    if (devtrac.dataPull.sitesForActionItems.length == 0) {
        callback();
        return;
    }
    var site = devtrac.dataPull.sitesForActionItems.pop();
    var actionItemSuccess = function(actionItemResponse){
        // For test only
        // actionItemResponse = actionItemData;
        if (hasError(actionItemResponse)) {
            alert(getErrorMessage(actionItemResponse));
            callback();
        }
        else {
            if (actionItemResponse['#data'].length == 0) {
                callback();
                return;
            }
            var actionItems = $.map(actionItemResponse['#data'], function(item){
                var actionItem = new ActionItem();
                actionItem.title = item.title;
                actionItem.task = item.field_actionitem_followuptask[0].value;
                actionItem.assignedTo = $.map(item.field_actionitem_responsible, function(user){
                    return user.uid;
                }).join(", ");
                return actionItem;
            });
            site.actionItems = actionItems;
            $.each(devtrac.dataPull.fieldTrip.sites, function(index, siteFromCollection){
                if (siteFromCollection.id == site.id) {
                    devtrac.dataPull.fieldTrip.sites[index] = site;
                    if (devtrac.dataPull.sitesForActionItems.length > 0) {
                        devtrac.dataPull.actionItemDetailsForSite(callback);
                    }
                    else {
                        navigator.store.put(function(){
                            devtrac.dataPull.updateStatus("Updated '" + devtrac.dataPull.fieldTrip.title + "' with action items successfully.");
                            callback();
                        }, function(){
                            devtrac.dataPull.updateStatus("Error in saving field trip.");
                            callback();
                        }, "fieldTrip", JSON.stringify(devtrac.dataPull.fieldTrip));
                    }
                }
            });
        }
    };
    
    var actionItemFailed = function(){
        // Failed. Continue with callback function.
        callback();
    };
    
    screens.show("pull_status");
    devtrac.dataPull.updateStatus("Retrieving action item details for '" + site.name + "'.");
    devtrac.remoteView.call('api_fieldtrips', 'page_5', '["' + site.id + '"]', actionItemSuccess, actionItemFailed);
}

DataPull.prototype.updateStatus = function(message){
    var status = $("#status");
    status.append(message);
    status.append("<br/>");
}

DataPull.prototype.getPlaceTypeFor = function(id){
    for (var index in devtrac.places) {
        var place = devtrac.places[index];
        if (id == place.id) {
            return place;
        }
    }
}


