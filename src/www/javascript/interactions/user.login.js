function authenticate(userName, password, successCallback, failedCallback){
    var connectCallback = function(data){
        alert("Received data: " + JSON.stringify(data));
		var sessionId = data[DT.DATA_REF][DT.SESSION_ID_REF];
		alert("Connect sessionId: " + sessionId);
        if (userLoggedIn(data)) {
			alert("User is logged in already.");
            successCallback(data);
        }
        else {
			alert("Creating login hash");
            var timestamp = Math.round(new Date().getTime() / 1000);
            var params = {
                method: DT.USER_LOGIN,
                sessid: sessionId,
                username: userName,
                password: password,
                domain_name: DT.DOMAIN,
                domain_time_stamp: timestamp,
                api_key: DT.API_KEY,
                nonce: timestamp,
                hash: generateHash(DT.USER_LOGIN, timestamp)
            };
            
            callService(params, successCallback, failedCallback);
        }
    };
<<<<<<< HEAD
	alert("Calling connect api");
    callService(convertHash({
=======
    callService({
>>>>>>> 13c7e271b81153610a4c816ed8bed3ed663c9291
        method: DT.SYSTEM_CONNECT
    }, connectCallback, failedCallback);
}

function userLoggedIn(response){
    return response[DT.DATA_REF] && response[DT.DATA_REF][DT.USER_REF] &&
    response[DT.DATA_REF][DT.USER_REF][DT.NAME_REF] &&
    response[DT.DATA_REF][DT.USER_REF][DT.PASSWORD_REF];
}

