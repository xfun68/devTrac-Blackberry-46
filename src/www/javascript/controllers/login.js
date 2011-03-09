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
        fieldTripReports.showTripReports();
    };
    
    var loginFailed = function(){
        hideLoadingScreen();
    };
    showLoadingScreen();
    user.authenticate(userName, password, renderView, loginFailed);
};
