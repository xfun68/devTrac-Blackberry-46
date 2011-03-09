var siteController = new Object();

siteController.add = function() {
    var renderView = function() {
        $("#trip_report").hide();
        $("#questions_form").show();
    };
    renderView();
};