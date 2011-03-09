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
        showTripReportScreen();
        fieldTripReports.showTripReports();
    };
    
    var loginFailed = function(){
        showLoginScreen();
    };
    user.authenticate(userName, password, renderView, loginFailed);
};

loginController.logout = function(){
    try {
        navigator.store.remove(function(){
            // Ignore
        }, function(){
            // Ignore
        }, "user");
    } 
    catch (e) {
        // Log to console
    }
    user.loggedIn = false;
    user.name = "";
    user.email = "";
    user.uid = 0;
	showLoginScreen();
}
