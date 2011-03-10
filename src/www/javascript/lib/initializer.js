function initializeAll(){
    $("#login").click(loginController.login);
    $("#logout").click(loginController.logout);
    $("#add_new_site_button").click(siteController.add);
    $("#sites_to_visit_button").click(siteController.list);
    // $("#questions-submit").click(questionsController.create);
    // $("#location1").click(questionsController.show);
    $("#logout").click(loginController.logout);
}
