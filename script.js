// JavaScript file for Web APIs Challenge: Code Quiz
// Variables for html elements
var scores = document.querySelector("#scores");
var timer = document.querySelector("#timer");
var mainSection = document.querySelector("#mainSection");
var heading = document.querySelector("#heading");
var mainBody = document.querySelector("#mainBody");
var start = document.querySelector("#start");
var response = document.querySelector("#response");

// All Questions, choices and answers put into arrays
var questionList = 

     ["Commonly used data types do NOT include:",
    "When being assigned to variables, string values must be enclosed within ____.", 
    "Arrays in JavaScript can be used to store _____."]

var choiceList = 
     ['"1. strings", "2. booleans", "3. numbers", "4. alerts"',
    '"1. commas", "2. colons", "3. quotes", "4. hashtags"',
    '"1. numbers", "2. characters", "3. booleans", "4. all of the above"']

var answerList =
    ["4. alerts",
    "3. quotes",
    "4. all of the above"]
    

// Variables for question loop functions
var start = document.getElementById("start");
var choiceList = [];
var curChoice = 0;
var curQuestion = 0;
var score = 0;
var timeLeft = 31;
var inProgress = false;
var scoreList = [];
var initials = "";
var clearResponse = false;
var clearResponseCode = 0;
var correct = false;

// Begin function- view scores button and the start button for the quiz
function begin() {
    start.addEventListener("click", questionLoop);
    prevScores.addEventListener("click", displayScores);
}

//shows the questions and the choices in a loop
function questionLoop () {
    runTimer();
    inProgress = true;
    start.setAttribute("style", "display: none");
    mainBody.setAttribute("style", "display: none");
    var questionNum = 0;
    while (questionNum < 3) {
        questionList.push(question);
            var choice = document.createElement("button");
            mainSection.appendChild(choice);
            choiceList.push(choice);
            choice.setAttribute("id", 'button${i}');
            questionNum = questionNum  + 1
        }
    nextQuestion();
    }

// Timer Countdown and end the quiz if time is zero
function runTimer () {
    var timeInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = 'Time: ' + timeLeft;
        if(timeLeft === 0) {
            clearInterval(timeInterval);
            if(heading.textContent !== "All Done.") {
                endOfQuiz();
            }
        }
    }, 1000)
}

// verifys if  at the last question
// then goes to either next question or end the quiz
function nextQuestion(event) {
    writeResponse(event);
    if(curQuestion < questionList.length) {
        changeQuestion();
    } else {
        endOfQuiz();
    }
}

// Checks if at the first question 
// if not checks response from the previous question is correct
function writeResponse(event) {
    if(event !== undefined) {
        if(event.currentTarget.textContent === questionList[curQuestion - 1].response) {
            correct = true;
            response.textContent = "Correct";
            response.setAttribute("style", "color: green");
            score += 10;
        } else {
            correct = false;
            response.textContent = "Incorrect";
            response.setAttribute("style", "color: red");
            timer.setAttribute("style", "color: red");
            setTimeout(function () {
                timer.setAttribute("style", "color: black");
            },1000);
        }
        clearResponse();
    }
}

// after three seconds, clears the response
function clearResponse() {
    if(clearResponse) {
        clearResponse = false;
        clearTimeout(clearResponseCode);
        clearresponse();
    } else {
        clearResponse = true;
        clearResponseCode = setTimeout(function() {
            response.textContent = "";
            clearResponse = false;
        }, 3000);
    }
}

var choiceList= [
    document.getElementById ("button1"),
    document.getElementById ("button2"),
    document.getElementById ("button3"),
    document.getElementById ("button4"),

]

// Changes the question
// Changes the choices
function changeQuestion() {
    heading.textContent = questionList[curQuestion].question;
    for(var i = 0; i < questionList[curQuestion].length; i++) {
        choiceList[i].textContent = choiceList[curChoice].choice[i];        
        choiceList[i].addEventListener("click", nextQuestion);
    }
    curQuestion++;
}

// Changes title to Completed, clears choices and displays score
// Sets current question and score to zero and creates input fields
function endOfQuiz() {
    heading.textContent = "Completed.";
    timeLeft = 1;
    clearChoices();
    clearResponse();
    mainBody.setAttribute("style", "display: visible");
    mainBody.textContent = 'Your final score is: ' +  score;
    inputDataElements();
}

//Removes choice buttons
function clearChoices() {
    for(var i = 0; i < choiceList.length; i++) {
        choiceList[i].remove();
    }
    choiceList = [];
}

// stops entry field from refreshing the page
function stopRefresh(event) {
    if(event.key === "Enter") {
        event.preventDefault();
    }
}

// Clears scores
function clearScores() {
    localStorage.clear();
    mainBody.textContent = "";
    scoreList = [];
}

begin();