$(document).ready(function() {
    init();
});

function init() {
	alert("In init()");
	hideScreensExceptLogin();
    // Initialize all application events
    initializeAll();
}

function hideScreensExceptLogin() {
    $("#trip_report").hide();
    $("#questions_form").hide();
}