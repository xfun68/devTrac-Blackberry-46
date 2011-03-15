function DataStore(){

}

DataStore.prototype.init = function(callback){
    devtrac.dataStore.getQuestions(function(){
        devtrac.dataStore.getPlaces(callback);
    });
}

DataStore.prototype.retrieveFieldTrip = function(){
    navigator.store.get(function(response){
        if (response) {
            devtrac.fieldTrip = JSON.parse(response);
        }
    }, function(error){
        alert("Offline storage error");
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

DataStore.prototype.getQuestions = function(callback){
    navigator.store.get(function(response){
        if (response) {
            devtrac.questions = JSON.parse(response);
            if (callback) {
                callback();
            }
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
    }, function(error){
        alert("Offline storage error");
        if (callback) {
            callback();
        }
    }, "placeTypes");
    
}



