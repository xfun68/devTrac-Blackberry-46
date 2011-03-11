function LoginController(){
    // Login controller object
}

LoginController.prototype.show = function(){
	alert("In controller#show")
    if (navigator && navigator.store) {
        navigator.store.get(function(response){
            if (response) {
                devtrac.user = JSON.parse(response);
                devtrac.dataPull.pull(fieldTripController.showTripReports);
            }
            else {
				alert("Didn't find user");
                screens.show("login");
            }
        }, function(error){
			alert("Got error");
            screens.show("login");
        }, "user");
    }
    else {
		alert("Something wrong");
        screens.show("login");
    }
}

LoginController.prototype.login = function(){
    var userName = $("#username").val();
    var password = $("#password").val();
    
    var renderView = function(){
        alert("In render view");
		if (navigator && navigator.store) {
            navigator.store.put(function(){
                // Ignore
            }, function(){
                alert("Error in saving: " + devtrac.user.name);
            }, "user", JSON.stringify(devtrac.user));
        }
        else {
            alert("Offline storage unavailable.");
        }
		alert("Issueing a data pull");
        devtrac.dataPull.pull(fieldTripController.showTripReports);
    };
    
    var loginFailed = function(){
        screens.show("login");
    };
    screens.show("loading");
    devtrac.user.authenticate(userName, password, renderView, loginFailed);
};

LoginController.prototype.logout = function(){
    if (navigator && navigator.store) {
        navigator.store.remove(function(){
            devtrac.user.loggedIn = false;
            devtrac.user.name = "";
            devtrac.user.email = "";
            devtrac.user.uid = 0;
            screens.show("login");
        }, function(){
            console.log("Error occured in deleting user: " + devtrac.user.name);
        }, "user");
    }
    else {
        alert("Error occured in deleting user: " + devtrac.user.name);
    }
};
