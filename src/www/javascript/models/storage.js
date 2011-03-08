var store;

function initializeLawnchair(){
    alert("Trying to initialize datastore.");
	store = new Lawnchair({
        adaptor: "blackberry"
    }, function(lawnchair){
        alert("lawnchair initialized");
    });
}
