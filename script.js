var about, contact, resume, project, runnerbutton, home, backtotop,
    buttons;

//for click functionality on both desktop and mobile
var aboutButtons, contactButtons, resumeButtons, projectButtons, homeButtons;

var transitionHome = function(){
    $('#name').velocity({fontSize: '50px' }, "slow");
	about.velocity({
        position:'absolute',
        top:'30%',
        right:'71%'
	}, "slow");

	contact.velocity({
		position:'absolute',
		top:'30%',
		right:'22%'
	}, "slow");

	resume.velocity({
		position:'absolute',
		top:'70%',
		right:'70%'
	}, "slow");

	project.velocity({
		position:'absolute',
		top:'70%',
		right:'22%'
	}, "slow");

    runnerbutton.velocity({
        position:'absolute',
        top: '60%',
        right: '48%'
    });

	home.fadeOut("500");
}

var mq; //media query

$(document).ready(function(){
    aboutButtons = $('.button.about a' );
    contactButtons = $('.button.contact a');
    resumeButtons = $('.button.resume a');
    projectButtons = $('.button.project a');

    runnerbutton = $('#runnerbutton');
    homeButtons = $('.button.home a');
    backtotop = $('.backtotop');
    buttons = $('#buttons');

    $(".button:not(#runnerbutton) a").click(function(){
        $('.active').fadeOut("500").removeClass("active");
    });

    aboutButtons.click(function(){
        $('#aboutpage').fadeIn("500").addClass("active");
        backtotop.addClass("hidden");
    });

    contactButtons.click(function(){
        $('#contactpage').fadeIn("500").addClass("active");
        backtotop.addClass("hidden");
    });

    resumeButtons.click(function(){
        $('#resumepage').fadeIn("500").addClass("active");
        backtotop.removeClass("hidden");
    });

    homeButtons.click(function(){
        $('#homepage').fadeIn("500").addClass("active");
        buttons.addClass("startUp");
        backtotop.addClass("hidden");
        if(!mq.matches){
            $('#name').css("fontSize", "24px");
            transitionHome();
        }
    });

    projectButtons.click(function(){
        $('#projectpage').fadeIn("500").addClass("active");
        backtotop.removeClass("hidden");
    });

    mq = window.matchMedia( "(max-width:750px)" );
    mq.addListener(WidthChange);
    WidthChange(mq);

    var buttonsToTop = function(){
        about.velocity({top: '50px', right:'30px'});
        contact.velocity({top: '80px', right:'30px'});
        resume.velocity({top: '110px', right:'30px'}); 
        project.velocity({top: '140px', right:'30px'});
        runnerbutton.velocity({top: '170px', right:'30px'});
        home.fadeIn("500");
        buttons.removeClass("startUp");
    }

    function WidthChange(mq) {
        if(!mq.matches){
            about = $('#about');
            contact = $('#contact');
            resume = $('#resume');
            project = $('#project');
            home = $('#home');

            if($('#homepage').hasClass("active")){
                $('.startUp div:not(#runnerbutton, #home) a').click(function(){
                    buttonsToTop()
                });  
                transitionHome();
            }
            else{
                buttonsToTop();
            }
        }
    }

});


