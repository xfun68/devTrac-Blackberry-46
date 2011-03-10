<<<<<<< HEAD
function callService(dataString, callback, errorCallback){
    try {
		alert("Datastring: " + dataString);
        navigator.network.XHR(DT.SERVICE_ENDPOINT, dataString, callback);
    } 
    catch (e) {
        alert("Error occured in network communication: " + JSON.stringify(e));
		errorCallback(e);
    }
=======
function callService(data, callback, errorCallback){
	navigator.network.XHR(DT.SERVICE_ENDPOINT, convertHash(data), callback);
>>>>>>> 13c7e271b81153610a4c816ed8bed3ed663c9291
}

function generateHash(method, timestamp){
    return Crypto.HMAC(Crypto.SHA256, timestamp + ";" + DT.DOMAIN + ";" + timestamp + ";" + method, DT.API_KEY)
}

function convertHash(hash){
    var paramStr = "";
    for (param in hash) {
        paramStr += param;
        paramStr += '=';
        paramStr += hash[param];
        paramStr += "&";
    }
    return paramStr;
}

function hasError(response){
    if (response["#error"]) {
        return true;
    }
    else {
        if (response["#data"]) {
            var data = response["#data"];
            if (data["#error"]) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
}

function getErrorMessage(response){
    if (response["#error"]) {
        if (response["#message"]) {
            return response["#message"];
        }
        else 
            if (response["#data"]) {
                return response["#data"];
            }
            else {
                return "Unknown error occured. Please try again.";
            }
    }
    else {
        if (response["#data"]) {
            var data = response["#data"];
            if (data["#error"]) {
                return data["#message"];
            }
            else {
                return "Unknown error.";
            }
        }
        else {
            return "Unexpected #data format.";
        }
    }
}
