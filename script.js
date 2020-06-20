//Quiz Controller//
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}



// Add Timer for 60 Sec. to the quiz. The timer start after click "Start Quiz!"//
const startBtnClick = document.getElementById('start-btn');
var timer = document.querySelector('#timer');
var secondsLeft = 60;
startBtnClick.addEventListener('click', startTimer)
function startTimer (){

        timerInterval = setInterval(function(){
            secondsLeft --;
            timer.textContent = "Timer : " + secondsLeft + " second";

        if (secondsLeft ===0){
            clearInterval(timerInterval);

        }

        }, 1000);
}



function populate() {
    if(quiz.isEnded()) {
        showScores();
        showFinal();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};


function showFinal() {
    var submit = document.getElementById("final");
    submit.classList.remove("hide");
}



// create questions
var questions = [
    new Question("What is the syntax for creating a function in JavaScript named as Abcfunc?", ["function = Abcfunc()", "function Abcfunc()", "function := Abcfunc()", "function : Abcfunc()"], "function Abcfunc()"),
    new Question("Which one is not an object oriented programming language?", ["Java", "C#","C++", "C"], "C"),
    new Question("What is the JavaScript syntax for printing values in Console?", ["print(5)", "console.log(5);","console.print(5)", "function : Abcfunc()"], "console.log(5);"),
    new Question("How to initialize an array in JavaScript?", ["PHP", "Python", "Javascript", "All"], "All"),
    new Question("Which function of an Array object calls a function for each element in the array?", ["forEach()", "every();", "forEvery()", "each()"], "forEach()")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

