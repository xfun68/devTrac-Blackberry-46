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
    
	this.URLEncode = function(data){
		return escape(data).split('+').join('%2B').split('/').join('%2F');
	}
    this.base64Encode = function (data, urlEncode){
        if (typeof(btoa) == 'function') 
            return btoa(data);
        var b64_map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var byte1, byte2, byte3;
        var ch1, ch2, ch3, ch4;
        var result = new Array();
        var j = 0;
        for (var i = 0; i < data.length; i += 3) {
            byte1 = data.charCodeAt(i);
            byte2 = data.charCodeAt(i + 1);
            byte3 = data.charCodeAt(i + 2);
            ch1 = byte1 >> 2;
            ch2 = ((byte1 & 3) << 4) | (byte2 >> 4);
            ch3 = ((byte2 & 15) << 2) | (byte3 >> 6);
            ch4 = byte3 & 63;
            
            if (isNaN(byte2)) {
                ch3 = ch4 = 64;
            }
            else 
                if (isNaN(byte3)) {
                    ch4 = 64;
                }
            
            result[j++] = b64_map.charAt(ch1) + b64_map.charAt(ch2) + b64_map.charAt(ch3) + b64_map.charAt(ch4);
        }
        if(urlEncode){
			return this.URLEncode(result.join(''));
		}
        return result.join('');
    }
}
