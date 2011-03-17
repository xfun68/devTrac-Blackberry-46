function LoginController(){
    // Login controller object
}

LoginController.prototype.show = function(){
    navigator.store.get(function(response){
        if (response) {
            devtrac.user = JSON.parse(response);
            fieldTripController.showTripReports();
        }
        else {
            screens.show("login");
        }
    }, function(error){
        screens.show("login");
    }, "user");
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
            devtrac.dataPull.pull(fieldTripController.showTripReports);
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
            screens.show("login");
        }, function(){
            alert("Error occured in deleting user: " + devtrac.user.name);
            screens.show("login");
        }, "user");
    }, function(){
        screens.show("login");
    })
};
