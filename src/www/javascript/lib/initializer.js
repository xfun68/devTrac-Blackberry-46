function initializeApplicationEvents(){
    $("#login").click(devtrac.loginController.login);
    $("#logout").click(devtrac.loginController.logout);
    $("#add_new_site_button").click(siteController.add);
    $("#sites_to_visit_button").click(fieldTripController.showTripReports);
    $("#add_site_button").click(siteController.create);
    $("#site_details_back_button").click(fieldTripController.showTripReports);
    $(".site_details_sub_screen").click(devtrac.siteDetailController.show);
    $("#site_detail_narrative").click(devtrac.siteDetailController.narrative);
    $("#site_detail_contact_info").click(devtrac.siteDetailController.contactInfo);
    $("#site_detail_questions").click(devtrac.siteDetailController.questions);
    $("#site_detail_photo").click(devtrac.siteDetailController.photo);
    $("#site_detail_action_item").click(devtrac.siteDetailController.actionItem);
}
