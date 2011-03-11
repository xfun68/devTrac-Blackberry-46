var fieldTripController = new Object();

fieldTripController.showTripReports = function(){
    screens.show("loading");
    if (devtrac.user.loggedIn) {
        if (navigator && navigator.store) {
            navigator.store.get(function(response){
                if (response) {
                    devtrac.fieldTrip = JSON.parse(response);
                    $("#trip_title").html(devtrac.fieldTrip.title);
					$("#site_list").html("");
                    for (var id in devtrac.fieldTrip.sites) {
						var site = devtrac.fieldTrip.sites[id];
						alert("Site: " + JSON.stringify(site));
                        var html = "<li><span id=\"" + site.id + "\">" + site.name + "</span>";
                        if (site.complete) {
                            html += "<span class=\"done\"><img src=\"css/images/icon_tick.gif\"/></span>";
                        }
                        html += "</li>"
						$("#site_list").append(html);
                    }
                    screens.show("sites_to_visit");
                }
                else {
                    alert("You don't have active field trips.");
                    screens.show("login");
                }
            }, function(error){
                screens.show("login");
            }, "fieldTrip");
        }
        else {
            screens.show("login");
        }
    }
    else {
        screens.show("login");
    }
};
