var siteController = new Object();

siteController.add = function(){
    var questions = new QuestionTypes(devtrac.questions);
	var list = $('#sitetypes');
	list.html("");
    $(questions.locationTypes()).each(function(i, option){
        list.append("<option>" + option + "</option>");
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
	navigator.store.put(function(){
        alert(site.name + " added successfuly.");
		$("#site_title").val("");
        fieldTripController.showTripReports();
    }, function(){
        alert("Error in creating trip.");
        screens.show("sites_to_visit");
    }, devtrac.user.name, JSON.stringify(devtrac.fieldTrip));
}

