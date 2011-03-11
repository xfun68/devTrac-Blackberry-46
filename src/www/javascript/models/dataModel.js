function FieldTrip(){
    this.id = "";
    this.title = "";
    this.sites = [];
}

function Site(){
    this.id = "";
    this.name = "";
	this.placeId = "";
	this.placeName = "";
	this.placeGeo = "";
	this.placeTaxonomy = [];
    this.type = "";
    this.complete = false;
    this.narrative = "";
    this.contactInfo = {
        name: "",
        phone: "",
        email: ""
    };
    this.submission = [];
    this.photo = "";
    this.actionItems = [];
}

function PlaceTaxonomy(){
	this.id = "";
	this.name = "";
}

function SubmissionItem(){
	this.id = "";
	this.response = "";
}

function PlaceType(){
	this.id = "";
	this.name = "";
	this.parentId = "";
}

function Question(){
    this.id = "";
    this.title = "";
    this.type = "";
    this.options = "";
	this.taxonomy = [];
}

function QuestionTaxonomy(){
	this.id = "";
    this.name = "";
}

function ActionItem(){
    this.actionItem = "";
    this.assignedTo = "";
}