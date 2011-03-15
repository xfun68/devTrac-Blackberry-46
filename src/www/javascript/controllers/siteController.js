var siteController = new Object();

siteController.add = function(){
    var questions = new QuestionTypes(devtrac.questions);
    $(questions.locationTypes()).each(function(i, option){
        $('#sitetypes').append("<option>" + option + "</option>");
    });
    screens.show("add_new_site");
};

siteController.list = function(){
    screens.show("sites_to_visit");
};

siteController.create = function(){
    var site = new Site();
    site.id = Math.round(new Date().getTime() / 1000);
    site.offline = true;
    site.name = $("#site_title").val();
    site.type = $("#sitetypes").val();
    devtrac.fieldTrip.sites.push(site);
    if (navigator && navigator.store) {
        navigator.store.put(function(){
            fieldTripController.showTripReports();
        }, function(){
            alert("Error in creating trip.");
            screens.show("sites_to_visit");
        }, "fieldTrip", JSON.stringify(devtrac.fieldTrip));
    }
    else {
        alert("Offline storage unavailable.");
        screens.show("sites_to_visit");
    }
    
}

