var devtrac = {
	loginController: new LoginController(),
	user: new User()
}
function onLoad(){
    // BlackBerry OS 4 browser does not support events.
    // So, manually wait until PhoneGap is available.
    //
    var intervalID = window.setInterval(function(){
        if (PhoneGap.available) {
            window.clearInterval(intervalID);
            init();
        }
    }, 500);
}

function init(){
    screens.show("login");
    initializeApplicationEvents();
    devtrac.loginController.show();
}
