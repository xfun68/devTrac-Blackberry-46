var fieldTripController = new Object();

fieldTripController.showTripReports = function(){
    screens.show("loading");
    if (devtrac.user.loggedIn) {
        navigator.store.get(fieldTripController.display, function(error){
            screens.show("login");
        }, devtrac.user.name);
    }
    else {
        screens.show("login");
    }
};

fieldTripController.display = function(response){
    if (response) {
        devtrac.fieldTrip = JSON.parse(response);
        $("#trip_title").html(fieldTripController.siteTitle(devtrac.fieldTrip.title));
        var sitesContainer = $("#site_list");
        var noSitesTip = $("#no_sites_in_trip");
        sitesContainer.html("");
        if (devtrac.fieldTrip.sites.length == 0) {
            noSitesTip.show();
            $(".sites_list").hide();
            screens.show("sites_to_visit");
            return;
        }
        fieldTripController.paintSites();
    }
    else {
        alert("You don't have active field trips.");
        devtrac.loginController.logout();
    }
}

fieldTripController.siteTitle = function(actualTitle){
    return actualTitle.length > 22 ? actualTitle.substring(0, 22) + "..." : actualTitle;
}

fieldTripController.paintSites = function(){
    var sitesContainer = $("#site_list");
    var noSitesTip = $("#no_sites_in_trip");
    for (var id in devtrac.fieldTrip.sites) {
        var site = devtrac.fieldTrip.sites[id];
        var siteId = site.id ? site.id : site.name;
        var siteName = site.type ? site.name + ", " + site.type : site.name;
        var html = "<li id=\"" + siteId + "\" class=\"link site_item\"><span>" + siteName + "</span>";
        if (site.complete) {
            html += "<span class=\"done\"><img src=\"css/images/icon_tick.gif\"/></span>";
        }
        html += "</li>";
        sitesContainer.append(html);
    }
    noSitesTip.hide();
    $(".sites_list").show();
    screens.show("sites_to_visit");
    attachClickEvents("site_item", showSiteDetailScreen);
}
