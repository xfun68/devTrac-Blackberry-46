var fieldTrip = new Object();

fieldTrip.title = "";
fieldTrip.startDate = "";
fieldTrip.endDate = "";
fieldTrip.sitesToVisit = {};
fieldTrip.nid = 0;
fieldTrip.status = "";

fieldTrip.parse = function(response){
    if (response["#data"]) {
        if (response["#data"].length && response["#data"].length > 0) {
        	alert("Will process trip id: " + response["#data"][0]["nid"]);
        }
        else {
			alert("No sites to visit.");        
        }
    }
}


