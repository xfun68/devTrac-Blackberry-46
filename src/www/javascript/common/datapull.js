function DataPull(){
    alert("In datapull constructor");
    this.status = $("#status");
    this.fieldTrip = new FieldTrip();
}

DataPull.prototype.pull = function(callback){
    alert("In Pull");
    
    navigator.network.isReachable("devtrac.org", function(status){
        alert("Status: " + status);
        
        var tripSuccess = function(tripResponse){
            alert("In trip success");
            if (hasError(tripResponse)) {
                alert(getErrorMessage(tripResponse));
            }
            else {
                alert("Got successful trip response.");
                alert(">> " + JSON.stringify(tripResponse));
                devtrac.dataPull.fieldTrip.id = tripResponse["#data"][0]["nid"];
                devtrac.dataPull.fieldTrip.title = tripResponse["#data"][0]["title"];
                alert("Got first trip: " + JSON.stringify(devtrac.dataPull.fieldTrip));
            }
            callback();
        };
        
        var tripFailed = function(){
            alert("In trip failed");
            // Failed. Continue with callback function.
            callback();
        };
        
        if (status == "0") {
            alert("Offline")
            callback();
        }
        else {
            alert("Online")
            screens.show("pull_status");
            devtrac.dataPull.updateStatus("Getting field trips");
            alert("Fetching trips for user: " + devtrac.user.uid);
            devtrac.remoteView.call('api_fieldtrips', 'page_1', '["' + devtrac.user.uid + '"]', tripSuccess, tripFailed);
        }
    });
};

DataPull.prototype.updateStatus = function(message){
    this.status.append(message);
    this.status.append("<br/>");
}


function FieldTrip(){
    this.id = "";
    this.title = "";
    this.sites = {};
}

function Site(){
    this.id = "";
    this.name = "";
    this.type = "";
    this.complete = false;
    this.narrative = "";
    this.contactInfo = {
        name: "",
        phone: "",
        email: ""
    };
    this.questions = {};
    this.photo = "";
    this.actionItems = {};
}

function Place(){
    this.id = "";
    this.name = "";
    this.location = "";
}

function Question(){
    this.id = "";
    this.title = "";
    this.type = "";
    this.options = "";
    this.taxonomyId = "";
    this.taxonomyName = "";
}

function ActionItem(){
    this.actionItem = "";
    this.assignedTo = "";
}
