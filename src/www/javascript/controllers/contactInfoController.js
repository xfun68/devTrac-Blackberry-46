function ContactInfoController(){

}

ContactInfoController.prototype.edit = function(){
    screens.show("loading");
    $("#contact_name_input").val(devtrac.currentSite.contactInfo.name);
    $("#contact_phone_number_input").val(devtrac.currentSite.contactInfo.phone);
    $("#contact_email_input").val(devtrac.currentSite.contactInfo.email);
    screens.show("contact_info_edit");
}

ContactInfoController.prototype.save = function(){
    devtrac.currentSite.contactInfo.name = $("#contact_name_input").val();
    devtrac.currentSite.contactInfo.phone = $("#contact_phone_number_input").val();
    devtrac.currentSite.contactInfo.email = $("#contact_email_input").val();
    alert("Contact information saved.");
    devtrac.dataStore.saveCurrentSite(devtrac.siteDetailController.show);
}
