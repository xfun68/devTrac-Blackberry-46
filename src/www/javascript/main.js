function onLoad() {
    // BlackBerry OS 4 browser does not support events.
    // So, manually wait until PhoneGap is available.
    //
    var intervalID = window.setInterval(
      function() {
          if (PhoneGap.available) {
              window.clearInterval(intervalID);
              init();
          }
      },
      500
    );
}

function init(){
    screens.show("login");
    // Initialize all application events
    initializeAll();
    checkLoginStatus();
    
    //Move to the correct location
    var questions = new Questions(questiondata);
    $(questions.sitetypes()).each(function(i, option){
      $('#sitetypes').append("<option>" + option + "</option>");
    });
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