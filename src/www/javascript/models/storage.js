var store;

function initializeLawnchair(){
    try {
		store = new Lawnchair({
			adaptor: "blackberry"
		}, function(lawnchair){
			// Ignore
		});
	}catch(error){
		alert("Error: " + JSON.stringify(error));
	}
}
