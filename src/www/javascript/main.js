$(document).ready(function(){
    init();
});

function init(){

    // Initialize all application events
    initializeAll();
    checkLoginStatus();
}

function checkLoginStatus(){
    navigator.store.get(function(response){
        alert("Retreived: " + response);
        user = JSON.parse(response);
        if (user.loggedIn) {
            fieldTripReports.showTripReports();
        }
        else {
            showLoginScreen();
        }
    }, function(error){
        alert("Error in retreival: " + error);
    }, "user");
}

function showLoginScreen(){
    $("#login_screen").show();
    $("#trip_report").hide();
    $("#questions_form").hide();
}


function hideLoadingScreen(){
    // Loading logic here
}

function showLoadingScreen(){
    // Loading logic here
}

