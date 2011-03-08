var loginController = new Object();

loginController.login = function() {
    var userName = $("#username").val();
	alert(userName);
    var password = $("#password").val();
	alert(password);

    var renderView = function() {
		alert("Logged in successfully. Now show the trip reports.");
        //fieldTripReports.showTripReports();
    };

    var loginFailed = function() {
		alert("Login failed.");
		hideLoadingScreen();
    };
    // showLoadingScreen();
    user.authenticate(userName, password, renderView, loginFailed);
};