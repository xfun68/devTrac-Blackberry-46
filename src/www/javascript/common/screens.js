var screens = new Object();

screens.list = {
    "loading": "#spinner",
    "login": "#login_screen",
    "sites_to_visit": "#sites_to_visit",
    "add_new_site": "#add_new_site",
    "site_details": "#site_details_screen",
    "questions_form": "#questions_form",
    "site_narrative": "#site_narrative_screen",
    "contact_info": "#contact_info_screen",
    "photo": "#photo_screen",
    "add_action_item": "#add_action_item_screen"
};

screens.show = function(name){
    for (var screen in screens.list) {
        if (screen == name) {
            var element = $(screens.list[screen]);
            if (element) {
                element.show();
            }
        }
        else {
            var element = $(screens.list[screen]);
            if (element) {
                element.hide();
            }
        }
    }
};

