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
    devtrac.dataStore.saveCurrentSite(function(){
        alert("Updated narrative text.");
        devtrac.siteDetailController.show();
    });
};

SiteDetailController.prototype.photo = function(){
    screens.show('photo');
};

