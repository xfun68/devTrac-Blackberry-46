$(document).ready(function(){
    init();
});

function init(){
    hideScreensExceptLogin();
    // Initialize all application events
    initializeAll();
}

function hideScreensExceptLogin(){
    $("#trip_report").hide();
    $("#questions_form").hide();
}
