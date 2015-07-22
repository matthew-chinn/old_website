$(document).ready(function(){
    $('#name').animate({fontSize: '50px' }, "slow");

	transitionHome();
    
	$('.startUp a').click(function(){
		$('#about').animate({top: '50px', right:'50px', position:'fixed'});
		$('#contact').animate({top: '80px', right:'50px', position:'fixed'});
		$('#resume').animate({top: '110px', right:'50px', position:'fixed'}); 
		$('#game').animate({top: '140px', right:'50px', position:'fixed'});
		$('#home').fadeIn("500");
		$('#buttons').removeClass("startUp");
	});

	$('#about').click(function(){
		$('.active').fadeOut("500").removeClass("active");
		$('#aboutpage').fadeIn("500").addClass("active");
		$('#backtotop').fadeOut("500");
		$('#backdrop').css("height", "100%");	
	});

	$('#contact').click(function(){
		$('.active').fadeOut("500").removeClass("active");
		$('#contactpage').fadeIn("500").addClass("active");
		$('#backtotop').fadeOut("500");
		$('#backdrop').css("height", "100%");	
	});

	$('#resume').click(function(){
		$('.active').fadeOut("500").removeClass("active");
		$('#resumepage').fadeIn("500").addClass("active");
		$('#backtotop').fadeIn("500");
		$('#backdrop').css("height", "200%");
	});

	$('#home').click(function(){
		$('.active').fadeOut("500").removeClass("active");
		$('#homepage').fadeIn("500").addClass("active");
		$('#buttons').addClass("startUp");
		$('#backtotop').fadeOut("500");
		$('#backdrop').css("height", "100%");	
		transitionHome();
	});

});

var transitionHome = function(){
	$('#about').animate({
        position:'absolute',
        top:'180px',
        right:'70%'
	}, "slow");

	$('#contact').animate({
		position:'absolute',
		top:'180px',
		right:'260px'
	}, "slow");

	$('#resume').animate({
		position:'absolute',
		top:'70%',
		right:'70%'
	}, "slow");

	$('#game').animate({
		position:'absolute',
		top:'70%',
		right:'280px'
	}, "slow");

	$('#home').fadeOut("500");
}
