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
        fieldTripController.showTripReports();
    };
    
    var loginFailed = function(){
        showLoginScreen();
    };
    showLoadingScreen();
    user.authenticate(userName, password, renderView, loginFailed);
};

loginController.logout = function(){
    try {
        navigator.store.remove(function(){
            user.loggedIn = false;
            user.name = "";
            user.email = "";
            user.uid = 0;
            showLoginScreen();
        }, function(){
            console.log("Error occured in deleting user: " + user.name);
        }, "user");
    } 
    catch (e) {
        console.log("Error occured in deleting user: " + user.name);
    }
}
