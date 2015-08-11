$(document).ready(function(){
    $('#name').animate({fontSize: '50px' }, "slow");

    //preload image?
    $('<img />').attr('src',
    "aboutpic.jpg").appendTo('#aboutpage').addClass("picofme");

	transitionHome();
    
	$('.startUp a').click(function(){
		$('#about').animate({top: '50px', right:'50px', position:'fixed'});
		$('#contact').animate({top: '80px', right:'50px', position:'fixed'});
		$('#resume').animate({top: '110px', right:'50px', position:'fixed'}); 
		$('#project').animate({top: '140px', right:'50px', position:'fixed'});
		$('#home').fadeIn("500");
		$('#buttons').removeClass("startUp");
	});

    $('#buttons a').click(function(){
		$('.active').fadeOut("500").removeClass("active");
    });


	$('#about').click(function(){
		$('#aboutpage').fadeIn("500").addClass("active");
		$('#backtotop').fadeOut("500");
		$('#backdrop').css("height", "100%");	
	});

	$('#contact').click(function(){
		$('#contactpage').fadeIn("500").addClass("active");
		$('#backtotop').fadeOut("500");
		$('#backdrop').css("height", "100%");	
	});

	$('#resume').click(function(){
		$('#resumepage').fadeIn("500").addClass("active");
		$('#backtotop').fadeIn("500");
		$('#backdrop').css("height", "200%");
	});

	$('#home').click(function(){
		$('#homepage').fadeIn("500").addClass("active");
		$('#buttons').addClass("startUp");
		$('#backtotop').fadeOut("500");
		$('#backdrop').css("height", "100%");	
		transitionHome();
	});

    $('#project').click(function(){
		$('#projectpage').fadeIn("500").addClass("active");
		$('#backtotop').fadeOut("500");
		$('#backdrop').css("height", "120%");	
    });

});

var transitionHome = function(){
	$('#about').animate({
        position:'absolute',
        top:'30%',
        right:'71%'
	}, "slow");

	$('#contact').animate({
		position:'absolute',
		top:'30%',
		right:'20%'
	}, "slow");

	$('#resume').animate({
		position:'absolute',
		top:'70%',
		right:'70%'
	}, "slow");

	$('#project').animate({
		position:'absolute',
		top:'70%',
		right:'22%'
	}, "slow");

	$('#home').fadeOut("500");
}
