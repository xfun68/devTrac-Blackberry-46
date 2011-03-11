var siteController = new Object();

siteController.add = function(){
    screens.show("add_new_site");
};

siteController.list = function(){
    screens.show("sites_to_visit");
};

siteController.create = function(){
    var site = new Site();
    site.name = $("#site_title").val();
    site.type = $("sitetypes").val();
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

