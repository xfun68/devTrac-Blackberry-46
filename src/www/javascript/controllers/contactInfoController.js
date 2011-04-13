function ContactInfoController(){

}

ContactInfoController.prototype.edit = function(){
    navigator.log.debug("Editing contact information");
    screens.show("loading");
    $("#contact_name_input").val(devtrac.currentSite.contactInfo.name);
    $("#contact_phone_number_input").val(devtrac.currentSite.contactInfo.phone);
    $("#contact_email_input").val(devtrac.currentSite.contactInfo.email);
    screens.show("contact_info_edit");
    navigator.log.debug("Displayed contact information screen");
}

ContactInfoController.prototype.save = function(){
    navigator.log.debug("Saving contact information");
    devtrac.currentSite.contactInfo.name = $("#contact_name_input").val();
    devtrac.currentSite.contactInfo.phone = $("#contact_phone_number_input").val();
    devtrac.currentSite.contactInfo.email = $("#contact_email_input").val();
    
    devtrac.dataStore.saveCurrentSite(function(){
        alert("Contact information saved.");
		navigator.log.debug("Saved site with contact information changes.");
        devtrac.siteDetailController.show();
    });
}
