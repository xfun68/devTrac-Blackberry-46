function SiteDetailController(){

}

SiteDetailController.prototype.show = function(){
	$("#site_details_title").html(devtrac.currentSite.name);
    screens.show('site_details');
};

SiteDetailController.prototype.narrative = function(){
	$(".site_narrative_notes").val(devtrac.currentSite.narrative);
	screens.show('site_narrative');
};

SiteDetailController.prototype.updateNarrative = function(){
	devtrac.currentSite.narrative = $(".site_narrative_notes").val();
	$.each(devtrac.fieldTrip.sites, function(index, site){
		if(devtrac.currentSite.id == site.id){
			devtrac.fieldTrip.sites[index] = devtrac.currentSite;
		}
	});
	devtrac.dataStore.saveFieldTrip(devtrac.siteDetailController.show);
};

SiteDetailController.prototype.contactInfo = function(){
	screens.show('contact_info');
};

SiteDetailController.prototype.questions = function(){
	screens.show('questions_form');
};

SiteDetailController.prototype.photo = function(){
	screens.show('photo');
};

SiteDetailController.prototype.actionItem = function(){
	screens.show('list_action_items');
};

