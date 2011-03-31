function DataStore(){

}

DataStore.prototype.init = function(callback){
    navigator.store.get(function(response){
        if (response) {
            devtrac.user = JSON.parse(response);
            devtrac.dataStore.getQuestions(function(){
                devtrac.dataStore.getPlaces(function(){
                    devtrac.dataStore.getProfiles(function(){
                        devtrac.dataStore.retrieveFieldTrip(callback);
                    });
                });
            });
        }
        else {
            screens.show("login");
        }
    }, function(error){
        screens.show("login");
    }, "user");
}

DataStore.prototype.retrieveFieldTrip = function(callback){
    navigator.store.get(function(response){
        if (response) {
            devtrac.fieldTrip = JSON.parse(response);
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
    }, devtrac.user.name);
}

DataStore.prototype.saveFieldTrip = function(callback){
    navigator.store.put(function(){
        callback();
    }, function(){
        alert("Could not update field trip.");
        callback();
    }, devtrac.user.name, JSON.stringify(devtrac.fieldTrip));
}

DataStore.prototype.updateTripImageFid = function(imagePath, fid, callback){
    var imageFound = false;
    $.each(devtrac.fieldTrip.sites, function(index, site){
        for (var filePath in site.photos) {
            if (imagePath == filePath) {
                devtrac.fieldTrip.sites[index].photos[imagePath] = fid;
                imageFound = true;
            }
        }
    });
    
    if (imageFound) {
        devtrac.dataStore.saveFieldTrip(function(){
            if (callback) {
                callback('Images updated and saved');
            }
        });
    }
    else {
		if (callback) {
			callback('No image found to update');
		}
    }
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

DataStore.prototype.getProfiles = function(callback){
    navigator.store.get(function(response){
        if (response) {
            devtrac.profiles = JSON.parse(response);
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
    }, "profiles");
}



