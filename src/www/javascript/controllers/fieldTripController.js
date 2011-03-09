var fieldTripController = new Object();

fieldTripController.showTripReports = function(){
    showLoadingScreen();
    if (user.loggedIn) {
        var renderFieldTrips = function(response){
            fieldTrip.saveFieldTrip(response);
			showTripReportScreen();
        };
        
        var showError = function(response){
            showTripReportScreen();
            fail("Error occured in fetching trip report");
        };
        getFieldTrips(renderFieldTrips, showError)
    }
    else {
        showLoginScreen();
    }
};

fieldTrip.saveFieldTrip = function(response){
	fieldTrip.parse(response);
}
