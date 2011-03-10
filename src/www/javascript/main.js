$(document).ready(function(){
    init();
});

function init(){
    showLoadingScreen();
    // Initialize all application events
    initializeAll();
    window.setTimeout(checkLoginStatus, 5000);
}

function checkLoginStatus(){

    try {
        navigator.network.isReachable("devtrac.org", function(data){
            alert("Status: " + data == 0 ? "Offline" : "Online");
        });
        navigator.store.get(function(response){
            if (response) {
                user = JSON.parse(response);
                fieldTripController.showTripReports();
            }
            else {
                showLoginScreen();
            }
        }, function(error){
            showLoginScreen();
        }, "user");
    } 
    catch (e) {
        showLoginScreen();
    }
    
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

