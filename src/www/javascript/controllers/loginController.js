function LoginController(){
    // Login controller object
}

LoginController.prototype.show = function(){
    if (devtrac.user) {
        fieldTripController.showTripReports();
        return;
    }
    screens.show("login");
}

LoginController.prototype.login = function(){
    var userName = $("#username").val();
    var password = $("#password").val();
    
    if (!userName || !password) {
        alert("Please enter username and password.");
        return;
    }
    
    var renderView = function(){
        navigator.store.put(function(){
            devtrac.dataPull.pull(function(){
                devtrac.dataPull.tripDetails(fieldTripController.showTripReports);
            });
        }, function(){
            alert("Error in saving: " + devtrac.user.name);
        }, "user", JSON.stringify(devtrac.user));
    };
    
    var loginFailed = function(){
        screens.show("login");
    };
    screens.show("loading");
    devtrac.user.authenticate(userName, password, renderView, loginFailed);
};

LoginController.prototype.logout = function(){
    logout(function(){
        navigator.store.remove(function(){
            devtrac.user.loggedIn = false;
            devtrac.user.name = "";
            devtrac.user.email = "";
            devtrac.user.uid = 0;
			devtrac.fieldTrip = new FieldTrip();
            screens.show("login");
        }, function(){
            alert("Error occured in deleting user: " + devtrac.user.name);
            screens.show("login");
        }, "user");
    }, function(){
        screens.show("login");
    })
};
