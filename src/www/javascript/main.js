$(document).ready(function(){
    init();
});

function init(){
    screens.show("loading");
    // Initialize all application events
    initializeAll();
    window.setTimeout(checkLoginStatus, 5000);
}

function checkLoginStatus(){
    if (navigator && navigator.store) {
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
    else {
        screens.show("login");
    }
}
