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
    
    //outstanding issues how to contain the div within the container?
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
        //offset or position to get the location of the element currently
        var oldq = $('.a').offset();
        var speed = calcSpeed([oldq.top, oldq.left], newq);
        $('.a').animate({ top: newq[0], left: newq[1] }, speed, function(){
          animateDiv();        
        });   
    };
    
    //creating function to randomly change the speed of the box
    function calcSpeed(prev, next) {
        //prev and next left attribute
        var x = Math.abs(prev[1] - next[1]);
        //prev and next left top
        var y = Math.abs(prev[0] - next[0]);
        //ternary operator, if x > y; use x; else use y.
        var greatest = x > y ? x : y;
        //control the speed 
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
        //updates scores whenever image is clicked
        $('#scoreBox').html(function(i, val) { 
                return +val+1 
            });
        }  
    
    //activate countPoint point function
        $('.a').on('click', countPoint)
    
    //create a timer of 20s  that starts when i click on start
    var start = $('#startButton');
    var intervalId;
    var seconds = 20;
    
    start.on('click',function () {
        //i want to make the button unclickable but i failed so i hid it instead
        start.hide();
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
            //clear timer
            clearInterval(intervalId);
            //trying to make the background come back again but failed
            //$('.board').addClass('onBackground');
           //change 
            $('#timer').html('Restart?');
            //stop donald from moving around
            $('.a').stop();
            //stop the point counter
            $('.a').off('click', countPoint)        
        }

    }
    
    //tried to just refresh game without reloading; but can't change back the original background image. 
    //user timer button to restart game
    $('#timer').on('click', refreshPage);
    function refreshPage(){
        window.location.reload();
    }

    

//closing tag for whole page    
});


//get player score and alert. if score more than 30 pop up with a surprise photo
//alert(score);
//var score= parseInt($('#score').text());







