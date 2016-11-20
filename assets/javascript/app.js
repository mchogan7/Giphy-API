function game() {
var set = 0
    //Timer object
    var timer = {
        time: 30,
        tick:  function() {

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
                console.log('tick')

                },
        reset: function() {
            timer.time = 30;
             $('.timer').html(timer.time)
        },
        stop: function() {
            clearInterval(set)
        },
        start: function(){
            console.log('start')
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

    //List of questions in this object

    var questions = [{
            question: "Do you like Dinosaurs?",
            answer: "Yes",
            wrongAnswer: ["No"
            ]
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

    pushToStart()



    //Push to Start

    //Display questions with answers placed in random order

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

    function pushToStart() {
        $('.toStart').html("Press to Start.")
        $('.toStart').click(function() {
            timer.stop();
            timer.reset();
            $(this).html("")
            $('.triviaArea').html("");
            displayQuestions()
            timerIn();
        })
    }

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

    function winScreen() {
        timer.stop();
        $('.toStart').html("Good job! " + questions[increment].answer + " is correct!")
        $('.triviaArea').html("");
        correct += 1;
        setTimeout(nextQuestion, 3000);
    }

    function loseScreen() {
        timer.stop();
        $('.toStart').html("<div class='red'>Sorry! " + questions[increment].answer + " is the correct answer.</div>")
        $('.triviaArea').html("");
        wrong += 1;
        setTimeout(nextQuestion, 3000);
    }

    function nextQuestion() {
        if(increment === questions.length - 1){
            finalScore();
            console.log('over')
        }
        else{
        increment += 1
        $('.toStart').html("")
        randomArray = []
        timer.reset()
        timerIn();
        console.log("nextQ")
        displayQuestions()
    }
      

    }

    function timeCheck() {
        timerShake();
        if (timer.time === 0) {
            timerOut();
            console.log('times up!')
            $('.toStart').html("<div class='red'>Time is up! " + questions[increment].answer + " is the correct answer.</div>")
            $('.triviaArea').html("");
            outOfTime += 1;
            setTimeout(nextQuestion, 4000);
        }
    }

    function finalScore(){
            $('.triviaArea').html("<div class='final'>Correct Answers: " + correct + "</div><div class='final red'>Wrong Answers: " + wrong + "</div><div class='final red'>Ran Out of Time: " + outOfTime + "</div>"
                );
                                
    $('.toStart').html("")
    $('.triviaArea').append(
            $('<div/>')
            .addClass("button")
            .addClass("reset")
            .text("Play again.")
            )
    $('.reset').click(function(){resetGame()});

    }

    function resetGame(){
        $('.triviaArea').html("");
        $('.toStart').html("");
        correct = 0;
        wrong = 0;
        outOfTime = 0;
        increment = 0;
        randomArray = [];
        console.log(randomArray)
        pushToStart();
    }

    function timerIn(){
        $('.timer').removeClass('redTimer')
        $('.timer').removeClass('timerDown')
        $('.timer').addClass('timerUp')
    }

      function timerOut(){
        $('.timer').removeClass('timerUp')
        $('.timer').addClass('timerDown')
    }

    function timerShake(){
        if(timer.time <= 10 && timer.time > 0){
           $('.timer').addClass('redTimer') 
        $('.timer').effect( "shake", {times: 4, distance: 5}, 250 );
    }
    }







    //Setup win/lose parameters based on user choice or time running out

    //Show correct answer. Message depends on win, lose or out of time

    //Repeat for the rest of questions.

    //Tally all correct, wrong and out of time answers and display.

    //Ask to play again and reset.

}
game()
