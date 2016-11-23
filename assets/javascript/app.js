function game() {
    var set = 0
        //Timer object.
    var timer = {
        time: 30,
        tick: function() {
            if (timer.time === 0) {
                timer.stop()
            }

            if (timer.time > 9) {
                $('.timer').html(timer.time)
            } else {
                $('.timer').html('0' + timer.time)
            }
            timeCheck();
            timer.time -= 1
        },
        //These funcitons control start stop & reset of the timer.
        reset: function() {
            timer.time = 30;
            $('.timer').html(timer.time)
        },
        stop: function() {
            clearInterval(set)
        },
        start: function() {
            set = setInterval(timer.tick, 1000)
        }

    };

    //Variables to tally the score
    var correct = 0;
    var wrong = 0;
    var outOfTime = 0;

    //Array to hold randomized answers
    var randomArray = [];
    //Increments to move to next set of questions
    var increment = 0

    userArray = false;



    //List of questions

    var questions = [{
            question: "Do you like Dinosaurs?",
            answer: "Yes",
            wrongAnswer: ["No"]
        },

        {
            question: "Which of these is a Dinosaur?",
            answer: "Triceratops",
            wrongAnswer: ["Tricycle",
                "Tripod",
            ]
        },

        {
            question: "How much did the average Apatosaurus weigh?",
            answer: "19.8 Tons",
            wrongAnswer: ["17.2 Tons",
                "15.1 Tons",
                "12.9 Tons",
                "25.5 Tons"
            ]
        },

        {
            question: "A T-Rex boarded a train that traveled at an average speed of 100 kilometers per hour, stopping for 3 minutes after every 75 kilometers. A Dilophosaurus boarded a train that traveled at an average speed of 50 kilometers, stopping for 1 minute after every 25 kilometers. If the trains began traveling at the same time, how many kilometers did the Dilophosaurus train travel in the time it took the T-Rex train to travel 600 kilometers? ",
            answer: "307.5 km",
            wrongAnswer: ["300 km",
                "305 km",
                "1200 km",
                "1236 km",
                "Dinosaurs can't board trains."
            ]
        },

        {
            question: "What is the Family scientific classification of Albertadromeus?",
            answer: "Thescelosauridae",
            wrongAnswer: ["Orodrominae",
                "Ornithischia",
                "Dinosauria",
                "Reptilia",
                "Chordata",
                "Animalia",
                "I don't care."
            ]
        },

        {
            question: "Which of the following appears at the 129th place of the DNA sequence of a Stegosaurus?",
            answer: "TTT",
            wrongAnswer: ["GCT",
                "ATG",
                "CCA",
                "TCC",
                "TTG",
                "AAA",
                "GGG",
                "GAG",
                "GGA",
                "CGA",
                "CAT",
                "CCC",
                "TAG",
                "TGT",
                "Please stop."

            ]
        },

    ]
    
    var clone = questions.slice(0);
    console.log(clone);
    //Begins the game and renders initial HTML.
    pushToStart()


    //This function sets off the game. It calls all other functions based on clicks.
        function pushToStart() {
        $('.toStart').html("<div class ='title'>SUPER DINO QUIZ</div><div class='button start'>Press to Start.</div><div class='button userQuiz'>Make your own quiz.</div>")
        if(userArray === true){
             $('.toStart').append("<div class='button takeUserQuiz'>Retake your quiz.</div>")
            $('.takeUserQuiz').click(function() {
            timer.stop();
            timer.reset();
            $('.toStart').html("")
            $('.triviaArea').html("");
            displayQuestions()
            timerIn();
        })

        }
        $('.start').click(function() {
            questions = clone.slice(0);
            timer.stop();
            timer.reset();
            $('.toStart').html("")
            $('.triviaArea').html("");
            displayQuestions()
            timerIn();
            userArray = false
        })
            $('.userQuiz').click(function() { makeUserForm()
        questions = [] });
    }

   
    //This function randomizes the order of correct and wrong answers in an array.
    function randomizer() {
        randomArray = [];
        randomArray.push(questions[increment].answer)
        for (var i = 0; i < questions[increment].wrongAnswer.length; i++) {
            randomArray.push(questions[increment].wrongAnswer[i])
        }
        randomArray.sort(function(a, b) {
            return 0.5 - Math.random()
        });
    }

    //This function Displays the question and the randomized answers.
    function displayQuestions() {
        timer.start()
        randomizer();
        $('.triviaArea').append(
            $('<div/>')
            .addClass("question")
            .text(questions[increment].question)
        );
        $('.triviaArea').append($('<ol>'))

        for (var i = 0; i < randomArray.length; i++) {
            $('ol').append('<li><span class ="answer">' + randomArray[i] + '</span></li>');
        }
        answerCheck();
    }

    //This function checks for the correct answer on click.
    function answerCheck() {
        $('.answer').click(function() {
            timerOut()
            if ($(this).html() === questions[increment].answer) {
                winScreen();
                timer.stop()
            } else {
                loseScreen();
                timer.stop()
            }
        })
    }

    //On a correct guess, this screen is displayed. It continues to the next question after a delay.
    function winScreen() {
        timer.stop();
        $('.toStart').html("Good job! " + questions[increment].answer + " is correct!")
        $('.triviaArea').html("");
        correct += 1;
        setTimeout(nextQuestion, 3000);
    }
    //Same as above but for loses.
    function loseScreen() {
        timer.stop();
        $('.toStart').html("<div class='red'>Sorry! " + questions[increment].answer + " is the correct answer.</div>")
        $('.triviaArea').html("");
        wrong += 1;
        setTimeout(nextQuestion, 3000);
    }
    //Moves the game to the next question until all questions in the array are used.
    function nextQuestion() {
        if (increment === questions.length - 1) {
            finalScore();
        } else {
            increment += 1
            $('.toStart').html("")
            randomArray = []
            timer.reset()
            timerIn();
            displayQuestions()
        }
    }

    //Keeps track of the remaining time. Display a lose screen when it reaches 0.
    function timeCheck() {
        timerShake();
        if (timer.time === 0) {
            timerOut();
            $('.toStart').html("<div class='red'>Time is up! " + questions[increment].answer + " is the correct answer.</div>")
            $('.triviaArea').html("");
            outOfTime += 1;
            setTimeout(nextQuestion, 4000);
        }
    }

    //This renders the final score and gives the option reset the game and play again.
    function finalScore() {
        $('.triviaArea').html("<div class='final'>Correct Answers: " + correct + "</div><div class='final red'>Wrong Answers: " + wrong + "</div><div class='final red'>Ran Out of Time: " + outOfTime + "</div>");
        $('.toStart').html("")
        $('.triviaArea').append(
            $('<div/>')
            .addClass("button")
            .addClass("reset")
            .text("Play again.")
        )
        $('.reset').click(function() { resetGame() });
        }


        //Returns the game to initial settings.
    function resetGame() {
        $('.triviaArea').html("");
        $('.toStart').html("");
        correct = 0;
        wrong = 0;
        outOfTime = 0;
        increment = 0;
        randomArray = [];
        pushToStart();
    }

    //Controls the animation of the timer moving down into the window.
    function timerIn() {
        $('.timer').removeClass('redTimer')
        $('.timer').removeClass('timerDown')
        $('.timer').addClass('timerUp')
    }

    //Controls animation of moving timer up out of the window.
    function timerOut() {
        $('.timer').removeClass('timerUp')
        $('.timer').addClass('timerDown')
    }

    //Activates a red shaking animation when the timer reaches 10 seconds.
    function timerShake() {
        if (timer.time <= 10 && timer.time > 0) {
            $('.timer').addClass('redTimer')
            $('.timer').effect("shake", { times: 4, distance: 5 }, 250);
        }
    }


    //This builds the user quiz section
    $('.userQuiz').click(function() { makeUserForm()
        questions = [] });

    function makeUserForm() {
        $('.toStart').html("<div class ='title'>Make your own quiz:</div>" +
            "<div class ='formHeader'>Enter Question</div>" +
            "<form><input class ='userQuestion' type='text'></form>" +
            "<div class ='formHeader'>Enter Answer</div>" +
            "<form><input class = 'userAnswer' type='text'></form>" +
            "<div class ='formHeader'>Enter Wrong Answers</div>" +
            "<form><input class = 'userWrong' type='text'></form>")
        $('.triviaArea').html(
            "<div class ='addMore'>+ Add more wrong answers.</div>" +
            "<div class ='next button'>Next Question.</div>" +
            "<div class ='submit button'>Submit and Take Quiz.</div>")
        $('.addMore').click(function() {
            $('.toStart').append("<form><input class = 'userWrong' type='text'></form>")
        })

        //User can move to create next question
        $('.next').click(function() {
            saveQuestion();
            makeUserForm();
        })
        //User submits their questions and starts quiz.
        $('.submit').click(function() {
            saveQuestion();
            $('.triviaArea').html("")
            $('.toStart').html("")
            timerIn();
            displayQuestions()
        });
        userArray = true;
    }
    //Pushes user question object to the main object array. It then follows the same path as the default questions.
    function saveQuestion() {
        var userObject = {
            question: $('.userQuestion').val(),
            answer: $('.userAnswer').val(),
            wrongAnswer: []
        }
        $(".userWrong").each(function() {
            userObject.wrongAnswer.push($(this).val())
        });
        questions.push(userObject)
        console.log(clone);
    }


}
game() //the initial call of the entire game function.
