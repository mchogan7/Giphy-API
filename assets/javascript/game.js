function game() {

    // Global Variables


    var playerPicked = false
    var targeted = false
   
    // Pulls initial values from .html elements
    var targetAttk = parseInt($(".target").find(".counterAttack").html())
    var targetHP = parseInt($(".target").find(".hp").html())
    var playerAttk = parseInt($(".player").find(".attack").html())
    var playerHP = parseInt($(".player").find(".hp").html())
    
    // tracks how many enemies are alive
    var enemiesLeft = 3;

    // Player selects their character. Others are set to enemy.
    $('.char').click(function() {
        if (playerPicked === false) {
            playerPicked = true
            $(this).addClass("player");

            //All characters not set to 'player' are set to enemy.
            $(".char:not(.player)").addClass("enemy");
            $('.player').appendTo('.attackArea')
            $('.enemy').appendTo('.defendArea')

            //Removes 'Pick character' box.
            $('.chooseDino').addClass("disappear");

            //Adds pick your opponent.
            $('.winLose').html('Pick your Opponent.')
            $(".infoBox").fadeTo("fast", 1);
        }
       
        // Selects a target
        $('.enemy').click(function() {
            if (targeted === false) {
                targeted = true
                $(this).addClass("target");

                // Removes pick target
                $(".infoBox").fadeTo("slow", 0);

                //Add attack button
                $('.attackButton').fadeTo("fast", 1);

            }
        })
    })

//Attack button functions!

    $('.attackButton').click(function() {

    	//Gratuitous button shake animation
    	$('.attackButton').effect( "shake", { direction: "up", times: 4, distance: 5}, 250 );

    	//Updates stats from HTML and parsing to interger
        var targetAttk = parseInt($(".target").find(".counterAttack").html())
        var targetHP = parseInt($(".target").find(".hp").html())
        var playerAttk = parseInt($(".player").find(".attack").html())
        var playerHP = parseInt($(".player").find(".hp").html())
        var gameover = false
        var increaseAttk = parseInt($(".player").attr("atk"))
        
        //Win-Lose conditions
        if (targeted && gameover === false) {
            console.log(playerAttk)
            var playerHit = playerHP - targetAttk;
            var targetHit = targetHP - playerAttk;
            $(".player").find(".attack").html(playerAttk)
            $(".player").find(".hp").html(playerHit)
            $(".target").find(".hp").html(targetHit)
            $(".player").find(".attack").html(playerAttk + increaseAttk)

            if (playerHit <= 0) {
                console.log('gameover')
                gameover = true
                $(".infoBox").fadeTo("fast", 1);
                $('.winLose').html('You are a Loser-saurus.   <button class="reset">Play Again</button>')
                $('.attackButton').fadeTo("fast", 0);
                $('.player').fadeTo("slow", 0);
                $('.reset').click(function() { document.location.reload() })

            }
            if (targetHit <= 0) {
                targeted = false
                $(".target").fadeTo("slow", 0);
                $(".target").addClass("dead")
				$(".target").removeClass("target")

                console.log('next target')
                enemiesLeft--
                console.log(enemiesLeft)
            }
            if (enemiesLeft === 0 && playerHit > 0) {
                $('.attackButton').fadeTo("fast", 0);
                $(".infoBox").fadeTo("fast", 1);
                $('.winLose').html('You are a Winner-saurus.  <button class="reset">Play Again</button>')
                $('.reset').click(function() { document.location.reload() })
                console.log('win')
            }
        }
    });

};
game();
