// JavaScript file for Web APIs Challenge: Code Quiz
// Variables for html elements
var scores = document.querySelector("#scores");
var timer = document.querySelector("#timer");
var mainSection = document.querySelector("#mainSection");
var heading = document.querySelector("#heading");
var mainBody = document.querySelector("#mainBody");
var start = document.querySelector("#start");
var response = document.querySelector("#response");

var choiceList= [
    document.querySelector ("button1"),
    document.querySelector ("button2"),
    document.querySelector ("button3"),
    document.querySelector ("button4"),

]


// All Questions, choices and answers put into arrays
var questionList = [
    {
        title: "Commonly used data types do NOT include:",
        choice: ["1. strings", "2. booleans", "3. numbers", "4. alerts"],
        answer: "4. alerts"
    },
    {
        title: "When being assigned to variables, string values must be enclosed within ____.",
        choice: ["1. commas", "2. colons", "3. quotes", "4. hashtags"],
        answer: "3. quotes"
    },

    {
        title: "Arrays in JavaScript can be used to store _____.",
        choice: ["1. numbers", "2. characters", "3. booleans", "4. all of the above"],
        answer: "4. all of the above",
    }

]; 

// Variables for question loop functions
var curQuestionIndex = 0;
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
    
  
    while (curQuestionIndex < questionList.length) {
        // get current question object from array
            var curQuestion = questionList[curQuestionIndex];
        // update title with current question
            var heading = document.getElementById("heading");
            heading.textContent = curQuestion.title;

            var choiceIndex = 0
           // while (choiceIndex < questionList[curQuestionIndex].choice.length) {
            while (choiceIndex < curQuestion.choice.length) {
                var choiceList = document.createElement("button");
                //var curChoice = questionList[curQuestionIndex].choice;
                var curChoice = curQuestion.choice;
                var curAnswer = curQuestion.answer;
               
                choiceList.textContent = curChoice[choiceIndex];

                mainSection.appendChild(choiceList);
                
                choiceIndex = choiceIndex + 1;

                }
            curQuestionIndex = curQuestionIndex  + 1;
            
            choiceList.addEventListener("click", validateAns());
            //nextQuestion();
            //validateAns();
            var curChoice = 0
            var curQuestion = 0
        }
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

// verifys if at the last question
// then goes to either next question or end the quiz
//function nextQuestion(event) {
function validateAns(event) {
    writeResponse(event);
    if(curQuestionIndex < questionList.length) {
         changeQuestion();
     } else {
        endOfQuiz();
    }
}

// Checks if at the first question 
// if not, checks response from the previous question is correct
function writeResponse(event) {
    if(event !== undefined) {
        if(event.currentTarget.textContent === curAnswer) {
        //if(event.currentTarget.textContent === questionList[curQuestion - 1].response) {
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

// Changes the question
// Changes the choices
// function changeQuestion() {
//     //heading.textContent = questionList[curQuestion].question;
//     for(var i = 0; i < questionList[curQuestion].length; i++) {
//         choiceList[i].textContent = choiceList[curChoice].choice[i];        
//         //choiceList[i].addEventListener("click", nextQuestion);
//         choiceList[i].addEventListener("click", validateAns);
//     }
//     curQuestion++;
// }

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