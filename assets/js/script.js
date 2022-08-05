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
var curAnswer = "";
var curChoice = "";

// Begin function- view scores button and the start button for the quiz
function begin() {
    start.addEventListener("click", questionLoop);
    // display prev scores
    prevScores.addEventListener("click", displayScores);
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
            if(timeLeft >= 10) {
                timeLeft -= 10;
            } else {
                timeLeft = 1;
            }
            questionLoop()

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
                // endgame function to input intials and score
                endOfQuiz();
                return ;
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
            curChoice = "";
            curQuestion = "";

            curQuestionIndex = curQuestionIndex  + 1;
            
}

// Timer Countdown and end the quiz if time is zero
function runTimer () {
    var timeInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = 'Time: ' + timeLeft;
        if(timeLeft <= 3) {
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
    response.textContent = "";
    mainBody.setAttribute("style", "display: visible");
    mainBody.textContent = "Your final score is: " +  score;
   inputDataElements();
}

// stops entry field from refreshing the page
function stopRefresh(event) {
    if(event.key === "Enter") {
        event.preventDefault();
    }
}

// form to enter initials
// click on submit 
function inputDataElements() {
    var initialsForm = document.createElement("form");
    mainSection.appendChild(initialsForm);
    initialsForm.setAttribute("id", "form");
    var label = document.createElement("label");
    initialsForm.appendChild(label);
    label.textContent = "Enter initials: "
    var input = document.createElement("input")
    initialsForm.appendChild(input);
    input.setAttribute("id", "initials");
    var submit = document.createElement("button");
    initialsForm.appendChild(submit);
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";

    heading.setAttribute("style", "align-self: start")
    mainBody.setAttribute("style", "align-self: start; font-size: 150%");
    
    input.addEventListener("keydown", stopRefresh);
    submit.addEventListener("click", addScore);
    
}

// If an incorrect input is given a message is displayed
// Sets the submit button to listen for click
function invalidInput() {
    response.textContent = "Initials must be entered as two characters or less";
    response.setAttribute("style", "color: black");
    clearResponse();
    var submit = document.getElementById("submit");
    submit.addEventListener("click", addScore);
}

// stops submit from refreshing page
// Checks if initials are formatted correctly
// preventdefault says the quiz is now over and takes out the form
// Saves the score
function addScore(event) {
    if(event !== undefined) {
        event.preventDefault();
    }
    var id = document.getElementById("initials");
    if(id.value.length > 2 || id.value.length === 0) {
        invalidInput();
        return;
    }
    inProgress = false;
    document.getElementById("form").remove();
    saveScore(id);
}

// any scores saved locally? if yes, populate to an array
// puts the score in the array and updates local storage
function saveScore(id) {
    if(localStorage.getItem("scoreList") !== null) {
        scoreList = JSON.parse(localStorage.getItem("scoreList"));
    }
    scoreList.push(`${score} ${id.value}`);
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
    displayScores();    
}

// Checks if quiz is in-progress to prevent being able to check scores during quiz
// Displays a message if quiz is in-progress.
// Changes title, writes scores and creates buttons for navigation
function displayScores() {
    if(!inProgress) {
        heading.textContent = "Previous Scores";
        // Hides start quiz button if view high scores is clicked at beginning
        start.setAttribute("style", "display: none");
        presentScores();
        createEndButtons();
    } else if(heading.textContent === "Completed.") {
      
        response.textContent = "Please enter 2 character initials";
        response.setAttribute("style", "color: black");
        clearresponse();
    } else {
        response.textContent = "Cannot view scores while in-progress";
        response.setAttribute("style", "color: black");
        clearresponse();
    }
}

// Empties content box and formats for list
// Checks if any scores are stored
// If there are they're put into an array
// The array displays the top score
// the contents of the array are printed through a loop
function presentScores() {
    mainBody.textContent = "";
    mainBody.setAttribute("style", "white-space: pre-wrap; font-size: 150%");
    if(localStorage.getItem("scoreList") !== null) {
        scoreList = JSON.parse(localStorage.getItem("scoreList"));
    }
    scoreList.sort();
    scoreList.reverse();
    var listSize = 5;
    if(listSize > scoreList.length) {
        listSize = scoreList.length;
    }
    for(var i = 0; i < listSize; i++) {
        mainBody.textContent += scoreList[i] + '\n';
    }
}

// Checks to see if the buttons have been created already
// Creates the buttons and sets listeners for a click
function createEndButtons() {
    if(!document.getElementById("restart")) {
        var restartVar = document.createElement("button");
        mainSection.appendChild(restartVar);
        restartVar.textContent = "Go Back";
        restartVar.setAttribute("id", "restart");
        
        var clearScoresVar = document.createElement("button");
        mainSection.appendChild(clearScoresVar);
        clearScoresVar.textContent = "Clear High Scores";
        clearScoresVar.setAttribute("id", "clearScores");
        
        restartVar.addEventListener("click", restart);
        clearScoresVar.addEventListener("click", clearScores)
    }
}

// Removes the current buttons on the screen
// Sets the title and content to original
// Makes start button visible, resets variables and runs begin function
function restart() {
    heading.setAttribute("style", "align-self: center");
    mainBody.setAttribute("style", "align-self: center; font-size: 110%");
    document.getElementById("restart").remove();
    document.getElementById("clearScores").remove();
    heading.textContent = "Web Programming Quiz";
    mainBody.textContent = "Please respond to each question.";
    start.setAttribute("style", "display: visible");
    curQuestion = 0;
    score = 0;
    timeLeft = 31;
    begin();
}


// Clears scores
function clearScores() {
    localStorage.clear();
    mainBody.textContent = "";
    scoreList = [];
}

begin();