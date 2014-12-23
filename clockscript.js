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

	        var elapsed = Math.floor(time / 1000) ;

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
        }
	function alarm(){
		var audio = new Audio('Sounds/Ship_Bell.mp3');
		audio.play();
	}
	var initialTime = null;
	var ticker = null;
	var clicked = true;

	//Start button event handler
    $(".start").click(function(){

    	if (clicked == true) {
			initialTime = new Date().getTime();
	    	ticker = setInterval(function(){ timer();}, 1000);
		    $(".start").html("Reset");
		    alarm();
    	}

    	else {
    		clearInterval(ticker)
	    	$(".start").html("Start");
	    	$('.digits').html("3 : 00 : 00");
    	}
    	
    	clicked = !clicked;
    });
});