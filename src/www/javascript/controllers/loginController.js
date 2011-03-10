var loginController = new Object();

loginController.login = function(){
    var userName = $("#username").val();
    var password = $("#password").val();
    
    var renderView = function(){
        try {
            navigator.store.put(function(){
                // Ignore
            }, function(){
                alert("Error in saving: " + user.name);
            }, "user", JSON.stringify(user));
        } 
        catch (e) {
            alert("Error: " + JSON.stringify(e));
        }
        screens.show("trip_report");
        fieldTripController.showTripReports();
    };
    
    var loginFailed = function(){
        screens.show("login");
    };
    screens.show("loading");
    user.authenticate(userName, password, renderView, loginFailed);
};

loginController.logout = function(){
    try {
        navigator.store.remove(function(){
            user.loggedIn = false;
            user.name = "";
            user.email = "";
            user.uid = 0;
            screens.show("login");
        }, function(){
            console.log("Error occured in deleting user: " + user.name);
        }, "user");
    } 
    catch (e) {
        console.log("Error occured in deleting user: " + user.name);
    }
}
