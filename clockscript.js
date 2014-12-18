$(document).ready(function() {

    window.onbeforeunload = function() {
        return "WARNING...THE CLOCK WILL BE RESET";
    }

	var start = new Date().getTime(),
    elapsed = '0.0';
    
    //function pad makes it so that a number has a 0 before it if it's a single digit.
    function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
    }
    
    window.setInterval(function(){
        var time = new Date().getTime() - start;

        elapsed = Math.floor(time / 1000) ;
        /*if(Math.round(elapsed) == elapsed) { 
            elapsed += '.0'; 
        }*/

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
            
        /*if (seconds % 2 == 0) {
                $('.blinker').css("visibility", "visible");
                console.log ('tick');
            }
        else {
                $('.blinker').css("visibility", "hidden");
                console.log ('tock');
            }*/
        
        $('#timer').html(hours + '<span class = "blinky"> : </span>' + pad(minutes) + '<span class = "blinky"> : </span>' + pad(seconds));
        /*$('#hour').html(hours);
        $('#minute').html(pad(minutes));
        $('#second').html(pad(seconds));*/

        if (seconds % 2 == 0) {
                $('.blinky').css("visibility", "visible");
                console.log ('tick');
            }
        else {
                $('.blinky').css("visibility", "hidden");
                console.log ('tock');
            }
        
        console.log('success');
        console.log(time);


    }, 100);
});