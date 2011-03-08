var questionsController = new Object();

questionsController.create = function() {
    $("#questions_form").hide();
    $("#trip_report").show();
};

questionsController.show = function() {
    $("#trip_report").hide();
    $("#questions_form").show();
}