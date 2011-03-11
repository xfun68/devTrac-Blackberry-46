function DataPull(){
    this.fieldTrip = new FieldTrip();
    this.questions;
    this.placeTypes;
}

DataPull.prototype.pull = function(callback){
    navigator.network.isReachable("devtrac.org", function(status){
		// Bypass downloading
		status = "0";
        if (status == "0") {
            callback();
        }
        else {
            devtrac.dataPull.questions(callback);
        }
    });
};

DataPull.prototype.questions = function(callback){
    var questionSuccess = function(questionResponse){
        if (hasError(questionResponse)) {
            alert(getErrorMessage(questionResponse));
            callback();
        }
        else {
            var questions = $.map(questionResponse['#data'], function(item){
                var question = new Question();
                question.id = item.nid;
                question.title = item.nid;
                question.type = item.nid;
                question.options = item.nid;
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
                    devtrac.dataPull.questions = questions;
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
    devtrac.dataPull.updateStatus("Getting all questions.");
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
                    devtrac.dataPull.placeTypes = places;
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
    devtrac.dataPull.updateStatus("Getting all place types.");
    devtrac.remoteView.call('api_placetypes', 'page_1', '', placesSuccess, placesFailed);
}

DataPull.prototype.tripDetails = function(callback){
    var tripSuccess = function(tripResponse){
        if (hasError(tripResponse)) {
            alert(getErrorMessage(tripResponse));
            callback()();
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
    devtrac.dataPull.updateStatus("Getting your field trip.");
    devtrac.remoteView.call('api_fieldtrips', 'page_1', '["' + devtrac.user.uid + '"]', tripSuccess, tripFailed);
}

DataPull.prototype.tripSiteDetails = function(callback){
    var siteSuccess = function(siteResponse){
        devtrac.dataPull.updateStatus("Received sites");
		if (hasError(siteResponse)) {
            alert(getErrorMessage(siteResponse));
            callback();
        }
        else {
			devtrac.dataPull.updateStatus("Validated sites");
            var sites = $.map(siteResponse['#data'], function(item){
				var site = new Site();
                site.id = item.nid;
                site.name = item.title;
                site.placeId = item.field_ftritem_place[0].nid;     
			    return site;
            });
            devtrac.dataPull.fieldTrip.sites = sites;
            if (navigator && navigator.store) {
                navigator.store.put(function(){
                    devtrac.dataPull.updateStatus("Saved '" + fieldTrip.title + "' trip successfully.");
                    callback();
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
    devtrac.dataPull.updateStatus("Getting sites for current tripId: " + devtrac.dataPull.fieldTrip.id);
	
    devtrac.remoteView.call('api_fieldtrips', 'page_2', '["' + devtrac.dataPull.fieldTrip.id + '"]', siteSuccess, siteFailed);
}

DataPull.prototype.updateStatus = function(message){
    var status = $("#status");
    status.append(message);
    status.append("<br/>");
}

DataPull.prototype.getPlaceTypeFor = function(id){
    for (var place in devtrac.dataPull.placeTypes) {
        if (id == place.id) {
            return place;
        }
    }
}
