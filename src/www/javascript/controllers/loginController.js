function LoginController(){
    // Login controller object
}

LoginController.prototype.show = function(){
    if (devtrac.user && devtrac.fieldTrip) {
        fieldTripController.showTripReports();
        return;
    }
    screens.show("login");
}

LoginController.prototype.login = function(){
    var userName = $("#username").val();
    var password = $("#password").val();
    
    if (!userName || !password) {
        alert("Please enter username and password.");
        return;
    }
    
    var renderView = function(){
        navigator.store.put(function(){
            devtrac.dataStore.getQuestions(function(){
                devtrac.dataStore.getPlaces(function(){
                    if (devtrac.questions && devtrac.places) {
                        // Check if fieldtrip is locally available for current user
                        devtrac.dataStore.retrieveFieldTrip(function(){
                            if (devtrac.fieldTrip && devtrac.fieldTrip.id) {
                                fieldTripController.showTripReports();
                                return;
                            }
                            // No fieldtrip exist for user. Download the details.
                            devtrac.dataPull.tripDetails(fieldTripController.showTripReports);
                        });
                    }
                    else {
                        devtrac.dataPull.questions(function(){
                            // Check if fieldtrip is locally available for current user
                            devtrac.dataStore.retrieveFieldTrip(function(){
                                if (devtrac.fieldTrip && devtrac.fieldTrip.id) {
                                    fieldTripController.showTripReports();
                                    return;
                                }
                                // No fieldtrip exist for user. Download the details.
                                devtrac.dataPull.tripDetails(fieldTripController.showTripReports);
                            });
                        });
                    }
                    
                });
            });
            
        }, function(){
            alert("Error in saving: " + devtrac.user.name);
        }, "user", JSON.stringify(devtrac.user));
    };
    
    var loginFailed = function(){
        screens.show("login");
    };
    screens.show("loading");
    devtrac.user.authenticate(userName, password, renderView, loginFailed);
};

LoginController.prototype.logout = function(){
    logout(function(){
        navigator.store.remove(function(){
            devtrac.user.loggedIn = false;
            devtrac.user.name = "";
            devtrac.user.email = "";
            devtrac.user.uid = 0;
            devtrac.fieldTrip = new FieldTrip();
            screens.show("login");
        }, function(){
            alert("Error occured in deleting user: " + devtrac.user.name);
            screens.show("login");
        }, "user");
    }, function(){
        screens.show("login");
    })
};
