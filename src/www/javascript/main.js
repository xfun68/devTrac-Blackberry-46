var devtrac = {
    loginController: new LoginController(),
    user: new User(),
	fieldTrip: new FieldTrip(),
	network: new Network(),
	dataPull: new DataPull(),
	dataStore: new DataStore(),
	siteDetailController: new SiteDetailController(),
	questionsController: new QuestionsController(),
	remoteView: new RemoteView(),
	currentSite: "",
	places: "",
	questions: ""
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
	initializeApplicationEvents();
	devtrac.dataStore.init(devtrac.loginController.show);
}
