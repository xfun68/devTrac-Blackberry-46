var user = new Object();

user.loggedIn = false;
user.name = "";
user.session = {};
user.email = "";
user.uid = "";

user.authenticate = function(userName, password, successCallback, failedCallback) {
	var success = function(response) {
		if (hasError(response)) {
            alert(getErrorMessage(response));
            failedCallback();
        } else {
            user.parseUserData(response);
            successCallback();
        }
    };

    var failed = function(response, textStatus) {
        alert("Error occured in authenticating. Details: [" + textStatus + "], " + JSON.stringify(response));
    };
    authenticate(userName, password, success, failed);
};

user.parseUserData = function(response) {
    user.loggedIn = true;
    user.name = response[DT.DATA_REF][DT.USER_REF][DT.NAME_REF];
    user.email = response[DT.DATA_REF][DT.USER_REF]['mail'];
    user.uid = response[DT.DATA_REF][DT.USER_REF]['uid'];
    user.session.id = response[DT.DATA_REF][DT.SESSION_ID_REF];
};