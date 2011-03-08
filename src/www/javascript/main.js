// invoked when application is resumed (brought to foregroud)
function doResume() {
    console.log('doResume()');
}

// invoked when application is paused (sent to background)
function doPause() {
    console.log('doPause()');
}

// register PhoneGap event listeners when DOM content loaded
function init() {
	debug("Whats up?");
    console.log('init()');
    document.addEventListener("resume", doResume, false);
    document.addEventListener("pause", doPause, false);
    hideScreensExceptLogin();
    // Initialize all application events
    initializeAll();
}

function unload() {
    console.log('unload()');
}

function hideScreensExceptLogin() {
    $("#trip_report").hide();
    $("#questions_form").hide();
}