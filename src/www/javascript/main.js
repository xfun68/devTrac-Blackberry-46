$(document).ready(function(){
    init();
});

function init(){
	showLoadingScreen();
    // Initialize all application events
    initializeAll();
    checkLoginStatus();
}

function checkLoginStatus(){
    navigator.store.get(function(response){
        //alert("Retreived: " + response);
        user = JSON.parse(response);
        if (user.loggedIn) {
            fieldTripReports.showTripReports();
        }
        else {
			showLoginScreen();
        }
    }, function(error){
        alert("Error in retreival: " + error);
        showLoginScreen();
    }, "user");
}

function showLoginScreen(){
    $("#spinner").hide();
    $("#login_screen").show();
    $("#trip_report").hide();
    $("#questions_form").hide();
}

function showTripReportScreen(){
	$("#spinner").hide();
    $("#login_screen").hide();
    $("#trip_report").show();
    $("#questions_form").hide();
}

function hideLoadingScreen(){
    $("#spinner").hide();
}

function showLoadingScreen(){
    $("#spinner").show();
    $("#login_screen").hide();
    $("#trip_report").hide();
    $("#questions_form").hide();
}

