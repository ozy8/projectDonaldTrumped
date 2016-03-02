$(function() {
//    alert("page loaded");
    $('.a').hide();
    //try pop up
    $('#overlay-back').fadeIn(500,function(){
            $('#popup').show();
            $('#go').hover(function() {
                $(this).css('cursor','pointer');
            });
         });
 
         $("#go").on('click', function() {
            $('#popup').hide();
            $('#overlay-back').fadeOut(500);
         });
    
    
    //end pop up
    
    //clear score on start   
    $('#scoreBox').html(0);
    
    $('#startButton').on('click',animateDiv);
    
    $('.board').hover(function() {
        $(this).addClass('donaldCursor');
    });
    
    $('#startButton').hover(function() {
        $(this).css('cursor','pointer');
    });
    
    $('#scoreBox').hover(function() {
        $(this).css('cursor','none');
    });
    
    $('#timer').hover(function() {
        $(this).css('cursor','pointer');
    });
    
    function makeNewPosition(){
        // Get viewport dimensions 
        var h = $('.board').height() - 100;
        var w = $('.board').width() - 100;
        //create new height and new width randomly
        var newh = Math.floor(Math.random() * h);
        var neww = Math.floor(Math.random() * w);

        return [newh,neww];    
    }

    function animateDiv(){
        //show donald
        $('.a').show();
        var newq = makeNewPosition();
        var oldq = $('.a').position();
        var speed = calcSpeed([oldq.top, oldq.left], newq);
        $('.a').animate({ top: newq[0], left: newq[1] }, speed, function(){
          animateDiv();        
        });   
    };
    
    //creating function to randomly change the speed of the box
    function calcSpeed(prev, next) {
        var x = Math.abs(prev[1] - next[1]);
        var y = Math.abs(prev[0] - next[0]);

        //ternary operator, if x > y; use x; else use y.
        var greatest = x > y ? x : y;

        var speedModifier = 0.2;

        var speed = Math.ceil(greatest/speedModifier);

        return speed;
    }


    //create function which counts points whenever div is clicked
    function countPoint() {
        //creating an audio tag with specific attributes and append to .a div
        $("<audio></audio>").attr({
            'src':'./sounds/youarefired.wav',
            'autoplay':'autoplay'
        }).appendTo('.a');
 
        console.log("box is clicked");
        $('#scoreBox').html(function(i, val) { return +val+1 });
    }
    
    //activate countPoint point function
        $('.a').on('click', countPoint)
    
    //create a timer of 20s
    var start = $('#startButton');
    var intervalId;
    var seconds = 20;
    
    start.on('click',function () {
        intervalId = setInterval (function () {
            updateTime()
        }, 1000 );
    });

    function updateTime() {        
        seconds --; 
        $('#timer').html(seconds);
    //make the background blink when time less than 5;        
        if(seconds===5){
            $('.board').addClass('noBackground');
            $('.board').css('background-color','#000081');
        }
        
        if(seconds===4){
            $('.board').css('background-color','#ff0000');
        }
        if(seconds===3){
            $('.board').css('background-color','#000081');
        }
        if(seconds===2){
            $('.board').css('background-color','#ff0000');
        }
        if(seconds===1){
          $('.board').css('background-color','#000081');
        }
        
        if(seconds <= 0){
            clearInterval(intervalId);
//            $('.board').addClass('onBackground');
            $('#timer').html('Restart?');
            $('.a').stop();
            $('.a').off('click', countPoint)
        }
    }

    //user timer button to restart game
    $('#timer').on('click', refreshPage);
    function refreshPage(){
        window.location.reload();
    }

    

//closing tag for whole page    
});








