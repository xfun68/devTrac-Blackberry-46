function callService(dataString, callback, errorCallback){
    alert("In callService");
    alert("Datastring: " + JSON.stringify(dataString));
    navigator.network.XHR(DT.SERVICE_ENDPOINT, dataString, callback);
    alert("called.");
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
    alert("Paramstr: " + paramStr);
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

function hideLoadingScreen(){
    $('#light').hide();
    $('#fade').hide();
}

function showLoadingScreen(){
    $('#light').show();
    $('#fade').show();
}
