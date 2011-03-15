function DataStore(){

}

DataStore.prototype.retrieveFieldTrip = function(){
    if (navigator && navigator.store) {
        navigator.store.get(function(response){
            if (response) {
                devtrac.fieldTrip = JSON.parse(response);
            }
            else {
                alert("You don't have active field trips.");
            }
        }, function(error){
            alert("Offline storage error");
        }, "fieldTrip");
    }
    else {
        alert("Offline storage not available");
    }
}

DataStore.prototype.saveFieldTrip = function(callback){
    if (navigator && navigator.store) {
		navigator.store.put(function(){
            callback();
        }, function(){
            alert("Could not update field trip.");
            callback();
        }, "fieldTrip", JSON.stringify(devtrac.fieldTrip));
    }
    else {
        alert("Offline storage unavailable.");
        callback();
    }
}

DataStore.prototype.getQuestions = function(){
    if (navigator && navigator.store) {
        navigator.store.get(function(response){
            if (response) {
                devtrac.questions = JSON.parse(response);
            }
            else {
                alert("No questions stored. Please sync your device.");
            }
        }, function(error){
            alert("Offline storage error");
        }, "questions");
    }
    else {
        alert("Offline storage not available");
    }
}

DataStore.prototype.getPlaces = function(){
    if (navigator && navigator.store) {
        navigator.store.get(function(response){
            if (response) {
                devtrac.places = JSON.parse(response);
            }
            else {
                alert("No places stored. Please sync your device.");
            }
        }, function(error){
            alert("Offline storage error");
        }, "places");
    }
    else {
        alert("Offline storage not available");
    }
}



