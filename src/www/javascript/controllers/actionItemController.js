function ActionItemController(){

}

ActionItemController.prototype.show = function(){
    screens.show("loading");
	var actionItemGrid = $(".action_item_grid");
	if (devtrac.currentSite.actionItems.length == 0) {
	    $("#no_action_items").show();
        actionItemGrid.hide();
		screens.show("list_action_items");
        return;
    }
	var container = $("#action_items_list");
    $("#no_action_items").hide();
    container.html("");
	$.each(devtrac.currentSite.actionItems, function(index, item){
        var html = "<div class='grid_row'><div class='col1'>" + item.title + "</div><div class='col2'>" + item.assignedTo + "</div></div>";
		container.append(html);
    });
    actionItemGrid.show();
    screens.show("list_action_items");
}

ActionItemController.prototype.add = function(){
    $("#action_item_title").val("");
    $("#action_item_task").val("");
    $("#action_item_assigned_to").val("");
	screens.show("add_action_item");
}

ActionItemController.prototype.save = function(){
    var title = $("#action_item_title").val();
    var task = $("#action_item_task").val();
    var assignedTo = $("#action_item_assigned_to").val();
    
    if (!title || !task || !assignedTo) {
        alert("Please enter title, task and assigned to values.");
        return;
    }
    
    var actionItem = new ActionItem();
    actionItem.title = title;
    actionItem.task = task;
    actionItem.assignedTo = assignedTo;
    devtrac.currentSite.actionItems.push(actionItem);
    devtrac.dataStore.saveCurrentSite(function(){
		alert("Added action item.");
		devtrac.actionItemController.show();
	});
}
