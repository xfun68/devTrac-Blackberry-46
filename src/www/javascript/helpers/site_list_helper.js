function showSiteDetailScreen(event){
    alert("You want site details for: " + JSON.stringify(this.id));
	for(var id in devtrac.fieldTrip.sites){
		var site = devtrac.fieldTrip.sites[id];
		if(this.id == site.id || this.id == site.name){
			devtrac.currentSite = site;
			devtrac.siteDetailController.show();
		}
	}
}

function attachClickEvents(id, callback){
    $('.site_item').click(callback);
}
