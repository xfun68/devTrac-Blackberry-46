function callService(dataString, callback, errorCallback) {
    if (!errorCallback) {
        errorCallback = function(data, status) {
            debug("Status: " + status);
            fail(data.responseText);
        }
    }
    $.ajax({
        type: 'POST',
        url: DT.SERVICE_ENDPOINT,
        data: dataString,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        success: callback,
        error: errorCallback
    });
}

function fail(error) {
    navigator.notification.alert(error, null, "Error");
}

function alert(message, callback, title) {
    navigator.notification.alert(message, callback, title);
}

function debug(message) {
    navigator.notification.alert(message, null, "Debug");
}

function generateHash(method, timestamp) {
    return Crypto.HMAC(Crypto.SHA256, timestamp + ";" + DT.DOMAIN + ";" + timestamp + ";" + method, DT.API_KEY)
}

function hasError(response) {
    if (response["#error"]) {
        return true;
    } else {
        if (response["#data"]) {
            var data = response["#data"];
            if (data["#error"]) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
}

function getErrorMessage(response) {
    if (response["#error"]) {
        if (response["#message"]) {
            return response["#message"];
        } else if (response["#data"]) {
            return response["#data"];
        } else {
            return "Unknown error occured. Please try again.";
        }
    } else {
        if (response["#data"]) {
            var data = response["#data"];
            if (data["#error"]) {
                return data["#message"];
            } else {
                return "Unknown error.";
            }
        } else {
            return "Unexpected #data format.";
        }
    }
}

function hideLoadingScreen() {
    $('#light').hide();
    $('#fade').hide();
}

function showLoadingScreen() {
    $('#light').show();
    $('#fade').show();
}

function reachableCallback(reachability) {
    // There is no consistency on the format of reachability
    var networkState = reachability.code || reachability;

    var states = {};
    states[NetworkStatus.NOT_REACHABLE] = 'No network connection';
    states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
    states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK] = 'WiFi connection';

}

function isServiceReachable() {
    navigator.network.isReachable(DT.SERVICE_ENDPOINT, reachableCallback);
}
