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
        };
	
	var initialTime = 0;
	var loop = 0;

	//Start button event handler
    $('.start').click(function(){

    	initialTime = new Date().getTime();
	    
	    loop = setInterval(function(){ timer()}, 1000);

	    $('.start').html("Reset");
	    $('.start').addClass('reset');
	    $('.start').removeClass('start');
    

    });

    //Reset button event handler
	//This part is not working because browser is still in Start click handler
	//Starts working if placed inside the above event handler.
    $('.reset').click(function(){
    	clearInterval(loop);
    	$('.reset').html('Start');
    	$('.reset').addClass('start');
    	$('.reset').removeClass('reset');
    	return;
    });
    
});