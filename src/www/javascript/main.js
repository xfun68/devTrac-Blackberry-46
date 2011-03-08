$(document).ready(function(){
    init();
});

function init(){
    hideScreensExceptLogin();
    // Initialize all application events
    initializeAll();
    // Initalize lawnchair datastore
    initializeLawnchair();
}

function dataTest(){
    retreive();
}

function save(value){
    value = value || 'a';
	var win = function(){
        alert('Saved value: ' + value);
    };
    store.save({
        key: 'count',
        name: value
    }, win);
}

function retreive(){
    var win = function(json){
        alert('Value: ' + json['name']);
        save(json['name'] + 'a');
    };
    
    store.get('count', win);
}

function hideScreensExceptLogin(){
    $("#trip_report").hide();
    $("#questions_form").hide();
}
