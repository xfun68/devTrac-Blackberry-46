function SiteDetailController(){

}

SiteDetailController.prototype.show = function(){
	$("#site_details_title").html(devtrac.currentSite.name);
    screens.show('site_details');
};
