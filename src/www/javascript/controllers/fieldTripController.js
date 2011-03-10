var fieldTripController = new Object();

fieldTripController.showTripReports = function(){
    screens.show("loading");
    if (user.loggedIn) {
        var renderFieldTrips = function(response){
            fieldTrip.saveFieldTrip(response);
			screens.show("sites_to_visit");
        };
        
        var showError = function(response){
            screens.show("sites_to_visit");
            fail("Error occured in fetching trip report");
        };
        getFieldTrips(renderFieldTrips, showError)
    }
    else {
        screens.show("login");
    }
};

fieldTrip.saveFieldTrip = function(response){
	fieldTrip.parse(response);
}
