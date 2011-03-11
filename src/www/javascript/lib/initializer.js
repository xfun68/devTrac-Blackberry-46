function initializeApplicationEvents(){
    $("#login").click(devtrac.loginController.login);
    $("#logout").click(devtrac.loginController.logout);
    $("#add_new_site_button").click(siteController.add);
    $("#sites_to_visit_button").click(fieldTripController.showTripReports);
	$("#add_site_button").click(siteController.create);
	$("#site_details_back_button").click(fieldTripController.showTripReports);
}
