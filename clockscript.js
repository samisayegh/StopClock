$(document).ready(function() {

	$(".wrapper").hide();
    /* 
    WARNING MESSAGE FOR REFRESH. TBA upon completion.
    
    window.onbeforeunload = function() {
        return "WARNING...THE CLOCK WILL BE RESET";
    }
    */

    //Function pad makes it so that a number has a 0 before it if it's a single digit.
    function pad(d) {
    	return (d < 10) ? '0' + d.toString() : d.toString();
    }

    //Function takes care of counting down
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
        
        $(display).html(hours + 'h ' + pad(minutes) + 'm ' + pad(seconds));
        
        console.log('success');
        console.log(time);
       
        alarmSequence(elapsed, totalInterval, tickerId);
        progressValue(elapsed, totalInterval);
        
    }

    function recessTimer(initialTime, totalInterval, tickerId, display){
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
        
        $(display).html(minutes+ 'm ');
        
        console.log('success');
        console.log(time);
        
        //Takes care of closing the recess timer when the break is over
        
    	if (elapsed >= totalInterval) {
    		clearInterval(tickerId);
    		$(display).html('0m');
    		$(display).removeClass("active");
    	};
    }

	//Alarm sequence
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
	    }
	    //Closing alarm. Productivity success!
		if (elapsed >= totalInterval) {
			closingAlarm(tickerId);
		};	
	}
	//Progress updater
	function progressValue(elapsed, totalInterval){

		if (elapsed>=totalInterval) {
			$('.progressvalue').width("100%");
		}
		else {
			var fraction = elapsed/totalInterval;
			var lengthCompleted = fraction*100 + '%';
			$('.progressvalue').width(lengthCompleted);
		}
	}

	//Alarms
	function recessAlarm(){
		var audio = new Audio('sounds/Temple_Bell.mp3');
		audio.play();
		breakCounter++;
		var activeRecessDiv = ".recessDigits" + breakCounter;
		$(activeRecessDiv).addClass("active");
		var startTime = new Date().getTime();
		recessTicker = setInterval(function(){recessTimer(startTime, 600, recessTicker, activeRecessDiv);}, 1000);
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
	
	//Global variables to coordinate between the event handlers, and be able to terminate ticker from outside of the function.
	var clicked = true;
	var tickerLong;
	var recessTicker;
	var breakCounter = 0;
	
	//Start button event handler
    $(".button").click(function(){
		if (clicked) {
			initialTime = new Date().getTime();
			var delay = 1;
		    var tickerShort = setInterval(function(){ timer(initialTime, 10800, tickerShort, '.digits');}, delay);
		    setTimeout(function(){clearInterval(tickerShort);}, 5);
		    delay = 1000;
		    tickerLong = setInterval(function(){ timer(initialTime, 10800, tickerLong, '.digits');}, delay);
		    $(".digits").removeClass("button");
		    $(".progressvalue").animate({width: "0"}, 1500);
		    $(".breakexplain").hide();
		    $(".wrapper").show();
		};
		clicked = false;
    });
    
    //Reset button event handler
    $(".reset").click(function(){
		clicked = true;
		breakCounter = 0;
    	clearInterval(tickerLong);
    	$(".progressvalue").animate({width: "100%"}, 1500);
    	$(".digits").addClass("button");
    	$(".button").html("START WORKING FOR 3 HOURS");
    	
    	clearInterval(recessTicker);
    	$(".recessDigits1, .recessDigits2, .recessDigits3").html("10m");
    	breakCounter = 0;
		
		$(".wrapper").hide();
    	$(".breakexplain").show();
		
    });
   
});