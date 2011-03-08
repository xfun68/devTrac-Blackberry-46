var fieldTripReports = new Object();

fieldTripReports.showTripReports = function() {
    if (user.loggedIn) {
        var renderFieldTrips = function(response) {
            $("#login_screen").hide();
            hideLoadingScreen();
            $("#trip_report").show();
        };

        var showError = function(response) {
            hideLoadingScreen();
            fail("Error occured in fetching trip report");
        };
        getFieldTrips(renderFieldTrips, showError)
    } else {
        $("#trip_report").hide();
        $("#login_screen").show();
    }
};