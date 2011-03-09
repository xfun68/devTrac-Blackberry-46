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
