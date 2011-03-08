var loginController = new Object();

loginController.login = function() {
    var userName = $("#username").val();
	var password = $("#password").val();
	
    var renderView = function() {
		fieldTripReports.showTripReports();
    };

    var loginFailed = function() {
		hideLoadingScreen();
    };
    showLoadingScreen();
    user.authenticate(userName, password, renderView, loginFailed);
};