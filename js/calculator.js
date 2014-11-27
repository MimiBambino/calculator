// Template scripting

var headerName = "<h1 id='name' class='analgous-color'>%data%</h1>";
var headerRole = "<h4 id='role' class='contrasting1-color'>%data%</h4>";
var headerContacts = "<div class='container'><div class='row'><div class='contactBar col-md-12'><ul class='nav nav-pills navbar-center'><li><a target='_blank' href='https://www.github.com/%github%' class='icon icon-github'></a></li><li><a target='_blank' href='http://www.linkedin.com/pub/cynthia-o-donnell/a2/719/7a0/' class='icon icon-linkedin'></a></li><li><a target='_blank' href='http://www.twitter.com/mimibambino' class='icon icon-twitter'></a></li><li><a href='mailto:%email%' class='icon icon-mail'></a></li><li><a target='_blank' href='http://%website%' class='icon icon-link'></a></li></ul></div></div></div>";

var projectName = "<h4 id='project'>%data%</h4>";

var contactLocation = "<li class='contact-type'>location: <span class='contact-data'>%data%</span></li>";
var contactWebsite = "<li class='contact-type'>website: <span class='contact-data'><a target='_blank' href='http://%data%'>%data%</a></span></li>";
var contactEmail = "<li class='contact-type'>email: <span class='contact-data'><a href='mailto:%data%'>%data%</a></span></li>";
var contactTwitter = "<li class='contact-type'>twitter: <span class='contact-data'><a target='_blank' href='http://www.twitter.com/mimibambino'>%data%</a></span></li>";
var contactGithub = "<li class='contact-type'>github: <span class='contact-data'><a target='_blank' href='https://www.github.com/%data%'>%data%</a></span></li>";
var contactLinkedIn = "<li class='contact-type'>linkedin: <span class='contact-data'><a target='_blank' href='http://www.linkedin.com/pub/cynthia-o-donnell/a2/719/7a0/'>%data%</a></span></li>";

var bio = {
  "name": "Cynthia O'Donnell",
  "project": "Calculator",
  "contacts": {
    "website" : "www.mimibambino.com",
    "email" : "mimibambino@gmail.com",
    "twitter" : "@mimibambino",
    "github" : "MimiBambino",
    "linkedin" : "Cynthia O'Donnell",
  },
  "displayHeader": function(){
    var formattedName = headerName.replace("%data%", bio.name);
    var formattedRole = headerRole.replace("%data%", bio.role);
    $("header").append(projectName.replace("%data%", bio.project));
    $("header").append(formattedName);
    var formattedContactBar = headerContacts.replace("%website%", bio.contacts["website"]).replace("%email%", bio.contacts["email"]).replace("%github%", bio.contacts["github"]);
    $("header").append(formattedContactBar);
  }
};

bio.displayHeader();
// Operations for a simple calculator

function add(num1, num2) {
  return num1 + num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}


var buttons = document.getElementsByClassName("button");
for (var i = 0, len = buttons.length; i < len; i++) {
  buttons[i].addEventListener("click", function(event) {
    handleInput(event.target.innerHTML);
  }, false);
}

function display(result) {
  document.getElementsByClassName("screen")[0].innerHTML = result;
}

var operand1 = "", operand2 = "";
var operator = "", justComputed = false;
function handleInput(input) {
  switch(type(input)) {
    case "digit":
      handleDigit(input);
      break;
    case "operator":
      handleOperator(input);
      break;
    case "CLEAR":
      handleClear();
      break;
    case "=":
      display( handleEquals() );
      break;
    default:
      display("ERROR");
  }
}

function handleDigit(input) {
  if (justComputed) {
    operand1 = "";
    operand2 = "";
    operator = "";
    justComputed = false;
  }
  if (operator === "") {
    operand1 += input;
    display(operand1);
  } else {
    operand2 += input;
    display(operand2);
  }
}

function handleOperator(input) {
  if(operand2 !== "") {
    display(handleEquals());
  }
  justComputed = false;
  if (input === "\xF7") {//hexcode for divide (consider using unicode)
    operator = "/";
  } else if (input == "\xD7") {//hexcode for multiply (consider using unicode)
    operator = "x";
  } else {
  operator = input;
  }
}

function handleClear() {
  operand1 = "";
  operand2 = "";
  operator = "";
  display(0);
}

function handleEquals() {
  var result;
  justComputed = true;

  if(operand2 === "") {
    operand2 = operand1;
  }
  switch(operator) {
    case "":
      return operand1;
      break;
    case "+":
      result = add(parseFloat(operand1), parseFloat(operand2));
      break;
    case "-":
      result = subtract(parseFloat(operand1), parseFloat(operand2));
      break;
    case "x":
      result = multiply(parseFloat(operand1), parseFloat(operand2));
      break;
    case "/":
      result = divide(parseFloat(operand1), parseFloat(operand2));
      break;
    default:
      display("OP ERROR");
  }
  operand1 = result;
  operand2 = "";
  return result;
}

function type(input) {
  if (input.search(/[0123456789.]/) !== -1){
    return "digit";
  } else if (input === "=" || input === "CLEAR") {
    return input;
  } else {
    return "operator";
  }
}