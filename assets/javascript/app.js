$(document).ready (function () {
    
    // Array of Questions and Answers
    var myQuestions = [   
        {question: "What is this anime about?",
        answers: {
          a: "Ninjas",
          b: "Pirates",
          c: "Samurais"
            },
        correctAnswer: "b",
        },
    
        {question: "What is the goal of the main character?",
        answers: {
        a: "To be the very best that no on ever was",
        b: "To fight strong people and be at the top",
        c: "To find the treasure and be king of pirates"
            },
        correctAnswer: "c",
        },
    
        {question: "What is the main character's name?",
        answers: {
        a: "Monkey D Luffy",
        b: "Son Goku",
        c: "Naruto Uzamaki"
            },
        correctAnswer: "a",
        },
    
        {question: "Who is the first person to be recruit it for the adventure?",
        answers: {
        a: "Nami",
        b: "Chopper",
        c: "Zoro"
            },
        correctAnswer: "c",
        },
    
        {question: "When Luffy meets Nami what was Nami's plan",
        answers: {
        a: "Join on the adventure",
        b: "Steal all their gold",
        c: "Ask them for help"
            },
        correctAnswer: "b",
        },
    
        {question: "What kind of powers Luffy has?",
        answers: {
          a: "Gomu Gomu Fruit, he is made of rubber",
          b: "Mera Mera Fruit, he is made of fire",
          c: "Goro Goro Fruit, he is made of lightning"
            },
        correctAnswer: "a",
        },
    
        {question: "In their adventure Luffy and the gang acquire a ship, what is the ship's name?",
        answers: {
        a: "Go go miriam",
        b: "Going Mery",
        c: "Great Maria"
            },
        correctAnswer: "b",
        },
    
        {question: "Who was it that beat Zoro in a swerd figth?",
        answers: {
        a: "Samurai X",
        b: "King Arthur",
        c: "Dracule Mihawk"
            },
        correctAnswer: "c",
        },
    
        {question: "When they were going to the new world, what was the giant animal obstacle in their way?",
        answers: {
        a: "A Whale",
        b: "An Octopus",
        c: "A Squid"
            },
        correctAnswer: "a",
        },
    
        {question: "When they lost their ship they had to get a new one, what was the name of that new ship?",
        answers: {
        a: "A Million Suns",
        b: "Sunny D light",
        c: "A Thousand Sunny"
            },
        correctAnswer: "c",
    }]
    
    // Timer and Score Variables
    var questionCounter = 0;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var gameState = "beginning"
    
    var timerRunning = false;
    var timerInterval;
    
    var userAnswer = false;
    // Creating the Timer speed and display
    var timer = {
        time: 10,
        start: function (){
            if (!timerRunning){
            timerInterval = setInterval(timer.count, 1000)
            timerRunning = true;
            }
        },
        stop: function (){
            clearInterval(timerInterval)
            timerRunning = false;
        },
        count: function (){
            $(".timer").text(timer.time + " Seconds Remaining")
            timer.time --
            timer.checkStatus()
        },
        checkStatus: function (){
            if (timer.time < 0 ){
                timesUp();
            }
        }
    
    }
    
    //Start game Click function
    $(".start-button").on("click", function () {
        $(this).css("display: none")
        renderBoard();
        })
    
    //Function when the game starts
    function renderBoard () {
        gameState = "active"
        emptyBoard();
        renderTimer(timer)
        renderQuestion(questionCounter)
        renderAnswers(questionCounter)
        }
    // Reseting the Timer
    function emptyBoard (){
        $(".game-board").empty();
        userAnswer = false;
        timer.time = 10;
        }   
    
    function renderTimer () {
        $(".game-board").append('<div class="timer">10 Seconds Remaining</div>')
        timer.start()
        }
    
    function renderQuestion(counter) {
        $(".game-board").append('<div class="question">'+ myQuestions[counter].question + '</div>')
        }
    
    function renderAnswers (counter) {
        $.each(myQuestions[counter].answers, function (index, value){
            $(".game-board").append('<div class="answer" id=' + index + '>'+ value + '</div>')
            });
        }
    
    //On user clicking an answer, check if user input is correct(got this part from a youtube video, a little fuzzy on how it works)
    
    $(".game-board").on("click", ".answer", function () {
        if (gameState !== "paused"){
            userAnswer = $(this).attr("id")
            checkAnswer(userAnswer, questionCounter);
            }
        })
    
    function checkAnswer (answer, counter) {
        if (answer == myQuestions[counter].correctAnswer) {
            correctAnswer();
            }
            else {
                wrongAnswer();
            }
        }
    
    function correctAnswer() {
        $('<div class="correct-answer">Correct!</div>').insertAfter(".timer")
        removeQuestions()
        timer.stop();
        questionCounter++
        correct++
        gameState = "paused"
        setTimeout(nextQuestion, 5000)
        }
    
    function wrongAnswer (){
        var key = myQuestions[questionCounter].correctAnswer
        $('<div class="wrong-answer">Incorrect! The correct answer is ' + myQuestions[questionCounter].answers[key] + '</div>').insertAfter(".timer")
        removeQuestions()
        timer.stop();
        incorrect++
        questionCounter++
        gameState = "paused"
        setTimeout(nextQuestion, 5000)
        } 
    
    function timesUp (){
        var key = myQuestions[questionCounter].correctAnswer
        $(".game-board").prepend('<div class="wrong-answer">Times up! The correct answer is ' + myQuestions[questionCounter].answers[key] + '</div>')
        removeQuestions()
        timer.stop();
        unanswered++
        questionCounter++
        gameState = "paused"
        setTimeout(nextQuestion, 5000)
        }
    
    function removeQuestions () {
        $(".question").remove()
        $(".answer").remove()
    }
    
    function nextQuestion () {
        if (questionCounter == myQuestions.length) {
            gameOver();
            }
        else {
            renderBoard();
            }   
        }
    
    function gameOver () {
        gameState = "over"
        renderResults();
        }
    
    function resetGame() {
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;    
        timerInterval;
        timerRunning = false;;
        }
    
    function renderResults (){
        $(".game-board").html('<div class="results">Correct Answers: ' + correct + '</div>')
        $(".game-board").append('<div class="results">Incorrect Answers: ' + incorrect + '</div>')
        $(".game-board").append('<div class="results">Unanswered Questions: ' + unanswered + '</div>')
        $(".game-board").append('<button class="reset-button">Play Again</button>')
        $(".game-board").on("click", ".reset-button", function() {
            resetGame();
            renderBoard();
            })
        }
    
    
    });