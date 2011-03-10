var screens = new Object();

screens.list = {
    "loading": "#spinner",
    "login": "#login_screen",
    "trip_report": "#trip_report",
    "site_details": "#site_details_screen",
    "questions_form": "#questions_form",
    "site_narrative": "#site_narrative_screen",
    "contact_info": "#contact_info_screen",
    "photo": "#photo_screen",
    "add_action_item": "#add_action_item_screen"
};

screens.show = function(name){
	for (var screen in screens.list) {
		if (screen == name) {
			$(screens.list[screen]).show();
        }
        else {
			$(screens.list[screen]).hide();
        }
    }
};

screens.showLoginScreen = function(){
	alert("Delete my usage showLoginScreen");
    $("#spinner").hide();
    $("#login_screen").show();
    $("#trip_report").hide();
    $("#questions_form").hide();
};

screens.showTripReportScreen = function(){
	alert("Delete my usage showTripReportScreen");
    $("#spinner").hide();
    $("#login_screen").hide();
    $("#trip_report").show();
    $("#questions_form").hide();
};

screens.hideLoadingScreen = function(){
	alert("Delete my usage hideLoadingScreen");
    $("#spinner").hide();
};

screens.showLoadingScreen = function(){
    alert("Delete my usage showLoadingScreen");
	$("#spinner").show();
    $("#login_screen").hide();
    $("#trip_report").hide();
    $("#questions_form").hide();
};

