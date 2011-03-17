function QuestionsController(){
    this.questions = [];
    this.answers = [];
}

QuestionsController.prototype.show = function(){
    var container = $('.question-content');
    container.html("");
    devtrac.questionsController.answers = [];
    devtrac.questionsController.questions = $.map(devtrac.questions, function(q){
        if (devtrac.currentSite.type == q.taxonomy[0].name) {
            return q;
        }
    });
    $.each(devtrac.questionsController.questions, function(index){
        var questionHtml = "";
        var q = devtrac.questionsController.questions[index];
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
    devtrac.questionsController.populateResponse();
    screens.show("questions_form");
}

QuestionsController.prototype.listQuestion = function(q){
    var html = "<div class='question'><label id='" + q.id + "'>" + q.title + "</label><select name='" + q.id + "' class='" + q.id + "'>";
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
        html += "<input type='radio' name='" + q.id + "' value='" + item + "'>" + item + "</input>";
    });
    html += "</div>";
    return html;
}

QuestionsController.prototype.numericQuestion = function(q){
    var html = "<div class='question'><label id='" + q.id + "'>" + q.title + "</label>";
    html += "<input type='text' name='" + q.id + "' value='' class='" + q.id + "'></input>";
    html += "</div>";
    return html;
}

QuestionsController.prototype.save = function(){
    devtrac.questionsController.collectListAnswers();
    devtrac.questionsController.collectRadioAnswers();
    devtrac.questionsController.collectTextAnswers();
    devtrac.currentSite.submission = devtrac.questionsController.answers;
    devtrac.dataStore.saveCurrentSite(devtrac.siteDetailController.show);
}

QuestionsController.prototype.collectListAnswers = function(){
    $("form :selected").each(function(){
        var answer = new SubmissionItem();
        answer.id = $(this).parent().attr("name");
        answer.response = $(this).val();
        devtrac.questionsController.answers.push(answer);
    });
}

QuestionsController.prototype.collectRadioAnswers = function(){
    $("form :checked").each(function(){
        var answer = new SubmissionItem();
        answer.id = $(this).attr("name");
        answer.response = $(this).val();
        devtrac.questionsController.answers.push(answer);
    });
}

QuestionsController.prototype.collectTextAnswers = function(){
    $("form input:text").each(function(){
        var answer = new SubmissionItem();
        answer.id = $(this).attr("name");
        answer.response = $(this).val();
        if (answer.response) {
            devtrac.questionsController.answers.push(answer);
        }
    });
}

QuestionsController.prototype.responseFor = function(id){
    for (var index in devtrac.currentSite.submission) {
        var answer = devtrac.currentSite.submission[index];
        if (answer.id == id) {
            alert("Matched response: " + id);
            return answer.response;
        }
    }
    return;
}

QuestionsController.prototype.populateResponse = function(){
    for (var index in devtrac.currentSite.submission) {
        var answer = devtrac.currentSite.submission[index];
        $(":text[name='" + answer.id + "']").val(answer.response);
        $(":radio[name='" + answer.id + "']").val([answer.response]);
        var elements = $("select[name='" + answer.id + "']");
        if (elements.length == 1) {
            var options = elements.children();
            options.each(function(i){
                var option = $(options[i]);
                if (option.attr("value") == answer.response) {
                    option.attr("selected", "selected");
                }
            });
        }
        
    }
}
