function getFieldTrips(successCallback, failedCallback){
    var connectCallback = function(data){
        var sessionId = data['#data']['sessid'];
        var timestamp = Math.round(new Date().getTime() / 1000);
        var params = {
            method: DT.VIEWS_GET,
            sessid: sessionId,
            domain_name: DT.DOMAIN,
            domain_time_stamp: timestamp,
            api_key: DT.API_KEY,
            nonce: timestamp,
            hash: generateHash(DT.VIEWS_GET, timestamp),
            view_name: 'api_fieldtrips',
            display_id: 'page_1',
            args: '["' + devtrac.user.uid + '"]'
        };
        
        callService(params, successCallback, failedCallback);
    };
    
    callService({
        method: DT.SYSTEM_CONNECT
    }, connectCallback, failedCallback);
}

