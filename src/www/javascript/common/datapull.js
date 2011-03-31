function DataPull(){
    this.fieldTrip = new FieldTrip();
    this.sites = [];
    this.sitesForActionItems = [];
}

DataPull.prototype.questions = function(callback){
    $("#status").html("");
    var questionSuccess = function(questionResponse){
        if (devtrac.common.hasError(questionResponse)) {
            alert(devtrac.common.getErrorMessage(questionResponse));
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
            
            navigator.store.put(function(){
                devtrac.dataPull.updateStatus("Saved " + questions.length + " questions successfully.");
                devtrac.questions = questions;
                devtrac.dataPull.placeTypes(callback);
            }, function(){
                devtrac.dataPull.updateStatus("Error in saving questions");
                callback();
            }, "questions", JSON.stringify(questions));
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
        if (devtrac.common.hasError(placesResponse)) {
            alert(devtrac.common.getErrorMessage(placesResponse));
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
            
            navigator.store.put(function(){
                devtrac.dataPull.updateStatus("Saved " + places.length + " place types successfully.");
                devtrac.places = places;
                devtrac.dataPull.userProfiles(callback);
            }, function(){
                devtrac.dataPull.updateStatus("Error in saving place types");
                callback();
            }, "placeTypes", JSON.stringify(places));
            
        }
    };
    
    var placesFailed = function(){
        // Failed. Continue with callback function.
        callback();
    };
    
    screens.show("pull_status");
    devtrac.dataPull.updateStatus("Retrieving location types.");
    devtrac.remoteView.call('api_placetypes', 'page_1', '', placesSuccess, placesFailed);
}


DataPull.prototype.userProfiles = function(callback){
    var profilesSuccess = function(profilesResponse){
        if (devtrac.common.hasError(profilesResponse)) {
            alert(devtrac.common.getErrorMessage(profilesResponse));
            callback();
        }
        else {
            var profiles = $.map(profilesResponse['#data'], function(item){
                var profile = new UserProfile();
				profile.nid = item.nid;
				profile.uid = item.uid;
				profile.name = item.title;
				profile.username = item.name;
                return profile;
            });
            
            navigator.store.put(function(){
                devtrac.dataPull.updateStatus("Saved " + profiles.length + " user profiles successfully.");
                devtrac.profiles = profiles;
				callback();
            }, function(){
                devtrac.dataPull.updateStatus("Error in saving user profiles");
                callback();
            }, "profiles", JSON.stringify(profiles));
            
        }
    };
    
    var profilesFailed = function(){
        // Failed. Continue with callback function.
        callback();
    };
    
    screens.show("pull_status");
    devtrac.dataPull.updateStatus("Retrieving user profiles types.");
    devtrac.remoteView.call('api_users', 'page_1', '', profilesSuccess, profilesFailed);
}

DataPull.prototype.tripDetails = function(callback){
    $("#status").html("");
    var tripSuccess = function(tripResponse){
        if (devtrac.common.hasError(tripResponse)) {
            alert(devtrac.common.getErrorMessage(tripResponse));
            callback();
        }
        else {
            if (tripResponse["#data"].length > 0) {
                devtrac.dataPull.fieldTrip.id = tripResponse["#data"][0]["nid"];
                devtrac.dataPull.fieldTrip.title = tripResponse["#data"][0]["title"];
                devtrac.dataPull.tripSiteDetails(callback);
                return;
            }
            alert("You don't have any active field trip. Please create a field trip.");
            devtrac.loginController.logout();
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
        if (devtrac.common.hasError(siteResponse)) {
            alert(devtrac.common.getErrorMessage(siteResponse));
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
            if (sites.length == 0) {
                devtrac.dataPull.saveFieldtrip(callback);
            }
            devtrac.dataPull.placeDetailsForSite(callback);
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
        if (devtrac.common.hasError(placeResponse)) {
            alert(devtrac.common.getErrorMessage(placeResponse));
            callback();
        }
        else {
            var placeDetails = placeResponse["#data"][0];
            site.placeId = placeDetails.nid;
            site.placeName = placeDetails.title;
            site.placeGeo = placeDetails.field_place_lat_long.openlayers_wkt;
            site.contactInfo.name = placeDetails.field_place_responsible_person[0].value;
            site.contactInfo.phone = placeDetails.field_place_phone[0].value;
            site.contactInfo.email = placeDetails.field_place_email[0].value;
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
                        devtrac.dataPull.actionItemDetailsForSite(callback);
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
        if (devtrac.common.hasError(actionItemResponse)) {
            alert(devtrac.common.getErrorMessage(actionItemResponse));
            callback();
        }
        else {
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
                        devtrac.dataPull.saveFieldtrip(callback);
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

DataPull.prototype.saveFieldtrip = function(callback){
    navigator.store.put(function(){
        devtrac.dataPull.updateStatus("Saved '" + devtrac.dataPull.fieldTrip.title + "' with action items successfully.");
        callback();
    }, function(){
        devtrac.dataPull.updateStatus("Error in saving field trip.");
        callback();
    }, devtrac.user.name, JSON.stringify(devtrac.dataPull.fieldTrip));
}

var QuestionTypes = function(questions){
    this.questions = questions;
    var that = this;
    
    this.locationTypes = function(){
        var types = $.map(that.questions, function(q){
            return q.taxonomy[0].name;
        });
        return $.unique(types);
    }
}
