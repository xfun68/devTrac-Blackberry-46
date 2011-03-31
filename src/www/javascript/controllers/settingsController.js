function SettingsController(){

}

SettingsController.prototype.show = function(){
    screens.show("settings");
}

SettingsController.prototype.updateQuestionsPlaces = function(){
    devtrac.dataPull.questions(function(){
        alert("Questions and places updated successfully.");
        devtrac.settingsController.show();
    });
}

SettingsController.prototype.wipeout = function(){
    screens.show("delete_confirm");
}

SettingsController.prototype.performWipeout = function(){
    navigator.store.nuke(function(){
        alert("All application data deleted.");
        navigator.utility.exit();
    }, function(){
        alert("Error occured while deleting application data.")
        devtrac.settingsController.show();
    });
}

SettingsController.prototype.uploadData = function(){
	screens.show("upload_progress");
	$('.upload_progress_log').html("");
	devtrac.dataPush.uploadData(function(msg){
		$('.upload_progress_log').append("<br/>"+ msg);
	},function(msg){
		alert(msg);
		$('.upload_progress_log').html("");
		devtrac.settingsController.show();
	});
}
