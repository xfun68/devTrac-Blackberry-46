var loginController = new Object();

loginController.login = function(){
    var userName = $("#username").val();
    var password = $("#password").val();
    
    var renderView = function(){
        navigator.store.put(function(){
        	alert("Saved: " + user.name);
		}, function(){
			alert("Error in saving: " + user.name);
        }, "user", JSON.stringify(user));
		showTripReportScreen();
        fieldTripReports.showTripReports();
    };
    
    var loginFailed = function(){
        showLoginScreen();
    };
    user.authenticate(userName, password, renderView, loginFailed);
};
