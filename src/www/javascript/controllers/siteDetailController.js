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

