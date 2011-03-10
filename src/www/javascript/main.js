$(document).ready(function(){
    init();
});

function init(){
<<<<<<< HEAD
    // Initalize lawnchair datastore
    initializeLawnchair();
    // Initialize all application events
    initializeAll();
    showLoadingScreen();
    window.setTimeout(checkForLoginStatus, 3000);
}

function checkForLoginStatus(){
    var dataExistance = true;
    if (store) {
        store.get('user', function(data){
            dataExistance = false;
            if (data['user']) {
                alert(data['user']);
                user = JSON.parse(data['user']);
                fieldTripReports.showTripReports();
            }
            else {
				alert("Didn't get data. Showing login screen.");
                showLoginScreen();
            }
        });
        if (dataExistance) {
			alert("Didn't get callback. Showing login screen.");
            showLoginScreen();
        }
    }
    else {
        alert("Failed to load application.");
		navigator.utility.exit();
    }
}

function showLoadingScreen(){
    $("#spinner").show();
    $("#login_screen").hide();
    $("#trip_report").hide();
    $("#questions_form").hide();
}

function hideLoadingScreen(){
    $("#spinner").hide();
}

function showLoginScreen(){
    $("#spinner").hide();
    $("#login_screen").show();
    $("#trip_report").hide();
    $("#questions_form").hide();
}

function showTripReports(){
    $("#spinner").hide();
    $("#login_screen").hide();
    $("#trip_report").show();
    $("#questions_form").hide();
}
=======
    screens.show("loading");
    // Initialize all application events
    initializeAll();
    window.setTimeout(checkLoginStatus, 5000);
}

function checkLoginStatus(){

    try {
        navigator.network.isReachable("devtrac.org", function(data){
            //console.log("Status: " + data == 0 ? "Offline" : "Online");
        });
        navigator.store.get(function(response){
            if (response) {
                user = JSON.parse(response);
                fieldTripController.showTripReports();
            }
            else {
				screens.show("login");
            }
        }, function(error){
            screens.show("login");
        }, "user");
    } 
    catch (e) {
        screens.show("login");
    }
    
}
>>>>>>> 13c7e271b81153610a4c816ed8bed3ed663c9291
