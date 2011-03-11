function Network(){
    isOnline = false;
    navigator.network.isReachable("devtrac.org", function(status){
        isOnline = status == 0 ? false : true;
    });
}
