var loginController = new Object();

loginController.login = function(){
    var userName = $("#username").val();
    var password = $("#password").val();
    showLoadingScreen();
    var renderView = function(){
        try {
            if (store) {
                store.save({
                    key: 'user',
                    user: JSON.stringify(user)
                }, function(){
                    alert("Stored: " + user.name);
                });
            }
        } 
        catch (e) {
            alert("Error: " + JSON.stringify(e));
        }
        hideLoadingScreen();
        fieldTripReports.showTripReports();
    };
    
    var loginFailed = function(){
        showLoginScreen();
    };
    user.authenticate(userName, password, renderView, loginFailed);
};

loginController.logout = function(){
	store.remove('user');
    user.loggedIn = false;
    user.name = '';
    user.email = '';
    user.uid = 0;
    user.session = {};
	alert("Logged out. Showing login screen.");
	showLoginScreen();
};
