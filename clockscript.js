$(document).ready(function() {

    /* 

    WARNING MESSAGE FOR REFRESH. TBA upon completion.
    
    window.onbeforeunload = function() {
        return "WARNING...THE CLOCK WILL BE RESET";
    }

    */

	
    
    //function pad makes it so that a number has a 0 before it if it's a single digit.
    function pad(d) {
    	return (d < 10) ? '0' + d.toString() : d.toString();
    }

    // Function takes care of counting down
    function timer(){
    	var time = new Date().getTime() - initialTime;

        elapsed = Math.floor(time / 1000) ;

        var t = 10800-elapsed;
        var hours = Math.floor(
            t/3600
            );
        var minutes = Math.floor(
            (t%3600)/60
            );
        var seconds = Math.floor(
            (t%3600)%60
            );
        
        $('.digits').html(hours + ' : ' + pad(minutes) + ' : ' + pad(seconds));
        
        console.log('success');
        console.log(time);

        //alarm sequence
        switch(elapsed){
        	//70 min break
        	case 4200:
        		recessAlarm();
        		break;
        	//80 min resume
        	case 4800:
        		resumeAlarm();
        		break;
        	//130 min break
        	case 7800:
        		recessAlarm();
        		break;
        	//140 min resume
        	case 8400:
        		resumeAlarm();
        	//170 min break
        	case 10200:
        		recessAlarm();
        	//Closing alarm. Productivity success!
        	case 10800:
        		closingAlarm();
        		break;
        }

    }
	
	function recessAlarm(){
		var audio = new Audio('sounds/Ship_Bell.mp3');
		audio.play();
	}

	function resumeAlarm(){
		var audio = new Audio('sounds/Car_Door.mp3');
		audio.play();
	}

	function closingAlarm(){
		var audio = new Audio('sounds/Temple_Bell');
		audio.play();
		clearInterval(ticker);
	}
	
	var elapsed = 0;
	var initialTime = null;
	var ticker = null;
	var clicked = true;

	//Start button event handler
    $(".start").click(function(){

    	if (clicked == true) {
			initialTime = new Date().getTime();
	    	ticker = setInterval(function(){ timer();}, 1000);
		    $(".start").html("Reset");
    	}

    	else {
    		clearInterval(ticker)
	    	$(".start").html("Start");
	    	$('.digits').html("3 : 00 : 00");
    	}
    	
    	clicked = !clicked;
    });
});