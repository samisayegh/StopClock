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

    // function takes care of counting down
    function timer(initialTime, totalInterval, tickerId, display){
    	var time = new Date().getTime() - initialTime;

        var elapsed = Math.floor(time / 1000) ;

        var t = totalInterval-elapsed;
        var hours = Math.floor(
            t/3600
            );
        var minutes = Math.floor(
            (t%3600)/60
            );
        var seconds = Math.floor(
            (t%3600)%60
            );
        
        $(display).html(hours + ' : ' + pad(minutes) + ' : ' + pad(seconds));
        
        console.log('success');
        console.log(time);
        
        if (display == '.recessDigits' && elapsed == totalInterval) {
        	clearInterval(tickerId);
        	$(display).html('');
        }
        else {
        	alarmSequence(elapsed, totalInterval, tickerId);
        }
    }

	//alarm sequence
	function alarmSequence(elapsed, totalInterval, tickerId){
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
	    	case totalInterval:
	    		closingAlarm(tickerId);
	    		break;
	    }

	}
	function recessAlarm(){
		var audio = new Audio('sounds/Temple_Bell.mp3');
		audio.play();
		var startTime = new Date().getTime();
		var recessTicker = setInterval(function(){timer(startTime, 600, recessTicker, '.recessDigits');}, 1000);
	}

	function resumeAlarm(){
		var audio = new Audio('sounds/Car_Door.mp3');
		audio.play();
	}

	function closingAlarm(tickerId){
		var audio = new Audio('sounds/Ship_Bell.mp3');
		audio.play();
		clearInterval(tickerId);
	}
	
	var clicked = true;
	var ticker;
	
	//Start button event handler
    $(".button").click(function(){
		
    	if (clicked == true) {
		initialTime = new Date().getTime();
	    	ticker = setInterval(function(){ timer(initialTime, 10800, ticker, '.digits');}, 1000);
		$(".button").html("Reset");
    	}

    	else {
    		clearInterval(ticker)
	    	$(".button").html("Start");
	    	$(".digits").html("3 : 00 : 00");
    	}
    	
    	clicked = !clicked;
    });
});
