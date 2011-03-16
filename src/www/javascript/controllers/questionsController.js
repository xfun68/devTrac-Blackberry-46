function QuestionsController(){

}

QuestionsController.prototype.show = function(){
    var container = $('.question-content');
    container.html("");
    var questions = $.map(devtrac.questions, function(q){
        if (devtrac.currentSite.type == q.taxonomy[0].name) {
            return q;
        }
    });
    $.each(questions, function(index){
        var questionHtml = "";
        var q = questions[index];
        switch (q.type) {
            case "1":
                questionHtml = devtrac.questionsController.listQuestion(q);
                break;
            case "2":
                questionHtml = devtrac.questionsController.objectiveQuestion(q);
                break;
            case "3":
                questionHtml = devtrac.questionsController.numericQuestion(q);
                break;
            default:
                questionHtml = "Unknown question type.";
        }
        container.append(questionHtml);
    });
    screens.show("questions_form");
}

QuestionsController.prototype.listQuestion = function(q){
    var html = "<div class='question'><label id='" + q.id + "'>" + q.title + "</label><select name='options_" + q.id + "' class='question_item'>";
    var options = q.options.split("\r\n");
    $.each(options, function(index){
        var item = options[index];
        html += "<option value='" + item + "'>" + item + "</option>";
    });
    html += "</select></div>";
    return html;
}

QuestionsController.prototype.objectiveQuestion = function(q){
    var html = "<div class='question'><label id='" + q.id + "'>" + q.title + "</label>";
    var options = q.options.split("\r\n");
    $.each(options, function(index){
        var item = options[index];
        html += "<input type='radio' name='" + q.id + "' value='" + item + "' class='question_item'>" + item + "</input>";
    });
    html += "</div>";
	return html;
}

QuestionsController.prototype.numericQuestion = function(q){
    var html = "<div class='question'><label id='" + q.id + "'>" + q.title + "</label>";
    html += "<input type='input' name='" + q.id + "' value='' class='question_item'></input>";
    html += "</div>";
    return html;
}
