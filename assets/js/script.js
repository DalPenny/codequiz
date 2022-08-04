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
var curAnswer = 0;
var curChoice = 0;

// Begin function- view scores button and the start button for the quiz
function begin() {
    start.addEventListener("click", questionLoop);
    //TODO!! display prev scores
    //prevScores.addEventListener("click", displayScores);
}

mainSection.addEventListener("click",checkAnswer )

function checkAnswer(event){
    if(event.target.matches(".answers")){
        if(questionList[curQuestionIndex - 1].answer===event.target.textContent)
        {
            correct = true;
            response.textContent = "Correct";
            response.setAttribute("style", "color: green");
            score += 10;
            questionLoop()
        } else {
            correct = false;
            response.textContent = "Incorrect";
            response.setAttribute("style", "color: red");
            timer.setAttribute("style", "color: red");
            setTimeout(function () {
                timer.setAttribute("style", "color: black");
            },1000);
            questionLoop()

            //keep track of score off of timer, 
            timeLeft = timeLeft-10
            //store time left
        }
    }

}

//shows the questions and the choices in a loop
function questionLoop () {
    runTimer();
    inProgress = true;
    start.setAttribute("style", "display: none");
    mainBody.setAttribute("style", "display: none");
    
        //loading current question with question, choices and answers
        // get current question object from array
            var curQuestion = questionList[curQuestionIndex];
            if (!curQuestion){
                return
                //TODO!!endgame function to input intials and score
            }
        // update title with current question
            var heading = document.getElementById("heading");
            heading.textContent = curQuestion.title;

            var choiceIndex = 0
            for(var i=0; i<mainSection.children.length;i++){
                mainSection.children[i].style.display = "none"
            }
        // displays current choices and save the answer to the variable
            while (choiceIndex < curQuestion.choice.length) {
                var choiceList = document.createElement("button");
                choiceList.setAttribute("class", "answers");
                curChoice = curQuestion.choice;
                curAnswer = curQuestion.answer;
               
                choiceList.textContent = curChoice[choiceIndex];

                mainSection.appendChild(choiceList);
                
                choiceIndex = choiceIndex + 1;
                }

            //initilize current choice and current question before next iteration
            curChoice = 0
            curQuestion = 0

            curQuestionIndex = curQuestionIndex  + 1;
    }

// Timer Countdown and end the quiz if time is zero
function runTimer () {
    var timeInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = 'Time: ' + timeLeft;
        if(timeLeft <= 2) {
            clearInterval(timeInterval);
            if(heading.textContent !== "Completed.") {
                endOfQuiz();
            }
        }
    }, 1000)
}

// Checks if at the first question 
// if not, checks response from the previous question is correct
    function writeResponse(event) {
    if(event !== undefined) {
        if(event.currentTarget.textContent === questionList[curQuestionIndex - 1].answer) {
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
// Changes title to Completed, clears choices and displays score
// Sets current question and score to zero and creates input fields
function endOfQuiz() {
    heading.textContent = "Completed.";
    timeLeft = 2;
    clearChoices();
    clearResponse();
    mainBody.setAttribute("style", "display: visible");
    mainBody.textContent = 'Your final score is: ' +  timeLeft;
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
//TO DO make input feild to enter scores
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