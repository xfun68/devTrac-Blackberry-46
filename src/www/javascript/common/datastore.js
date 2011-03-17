function DataStore(){

}

DataStore.prototype.init = function(callback){
    devtrac.dataStore.getQuestions(function(){
        devtrac.dataStore.getPlaces(function(){
            devtrac.dataStore.retrieveFieldTrip(callback);
        });
    });
}

DataStore.prototype.retrieveFieldTrip = function(callback){
    navigator.store.get(function(response){
        if (response) {
            devtrac.fieldTrip = JSON.parse(response);
            if (callback) {
                callback();
            }
        } else {
			callback();
		}
    }, function(error){
        alert("Offline storage error");
        if (callback) {
            callback();
        }
    }, "fieldTrip");
}

DataStore.prototype.saveFieldTrip = function(callback){
    navigator.store.put(function(){
        callback();
    }, function(){
        alert("Could not update field trip.");
        callback();
    }, "fieldTrip", JSON.stringify(devtrac.fieldTrip));
}


DataStore.prototype.saveCurrentSite = function(callback){
    $.each(devtrac.fieldTrip.sites, function(index, site){
        if (site.id == devtrac.currentSite.id) {
			devtrac.fieldTrip.sites[index] = devtrac.currentSite;
            devtrac.dataStore.saveFieldTrip(callback);
        }
    });
}

DataStore.prototype.getQuestions = function(callback){
    navigator.store.get(function(response){
        if (response) {
            devtrac.questions = JSON.parse(response);
            if (callback) {
                callback();
            }
        }
        else {
            callback();
        }
    }, function(error){
        alert("Offline storage error");
        if (callback) {
            callback();
        }
    }, "questions");
}

DataStore.prototype.getPlaces = function(callback){
    navigator.store.get(function(response){
        if (response) {
            devtrac.places = JSON.parse(response);
            if (callback) {
                callback();
            }
        }
        else {
            callback();
        }
    }, function(error){
        alert("Offline storage error");
        if (callback) {
            callback();
        }
    }, "placeTypes");
}



