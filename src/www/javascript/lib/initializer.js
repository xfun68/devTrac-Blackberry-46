function initializeAll(){
    $("#login").click(loginController.login);
    $("#type-submit").click(siteController.add);
    $("#questions-submit").click(questionsController.create);
    $("#location1").click(questionsController.show);
    $("#logout").click(loginController.logout);
}
