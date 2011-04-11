function Common(){
    this.callService = function(data, callback, errorCallback){
        navigator.network.XHR(DT.SERVICE_ENDPOINT, devtrac.common.convertHash(data), callback, errorCallback);
    }
    
    this.convertHash = function(hash){
        var paramStr = "";
        for (param in hash) {
            paramStr += param;
            paramStr += '=';
            paramStr += hash[param];
            paramStr += "&";
        }
        return paramStr;
    }
    
    this.generateHash = function(method, timestamp){
        return Crypto.HMAC(Crypto.SHA256, timestamp + ";" + DT.DOMAIN + ";" + timestamp + ";" + method, DT.API_KEY)
    }
    
    this.hasError = function(response){
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
    
    this.getErrorMessage = function(response){
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
}
