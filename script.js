var about, contact, resume, project, runnerbutton, home, backtotop,
    buttons;

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
		right:'20%'
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

var mq = window.matchMedia( "(max-width:640px)" );

$(document).ready(function(){
    if(mq.matches){ //for a desktop browser
        about = $('#about');
        contact = $('#contact');
        resume = $('#resume');
        project = $('#project');
        runnerbutton = $('#runnerbutton');
        home = $('#home');
        backtotop = $('#backtotop');
        buttons = $('#buttons');

        $('.startUp div:not(#runnerbutton) a').click(function(){
            about.velocity({top: '50px', right:'50px'});
            contact.velocity({top: '80px', right:'50px'});
            resume.velocity({top: '110px', right:'50px'}); 
            project.velocity({top: '140px', right:'50px'});
            runnerbutton.velocity({top: '170px', right:'50px'});
            home.fadeIn("500");
            buttons.removeClass("startUp");
        });

        $("#buttons div:not(#runnerbutton) a").click(function(){
            $('.active').fadeOut("500").removeClass("active");
        });


        about.click(function(){
            $('#aboutpage').fadeIn("500").addClass("active");
            backtotop.fadeOut("500");
        });

        contact.click(function(){
            $('#contactpage').fadeIn("500").addClass("active");
            backtotop.fadeOut("500");
        });

        resume.click(function(){
            $('#resumepage').fadeIn("500").addClass("active");
            backtotop.fadeIn("500");
        });

        home.click(function(){
            $('#homepage').fadeIn("500").addClass("active");
            buttons.addClass("startUp");
            backtotop.fadeOut("500");
            $('#name').css("fontSize", "24px");
            transitionHome();
        });

        project.click(function(){
            $('#projectpage').fadeIn("500").addClass("active");
            backtotop.fadeIn("500");
        });

        transitionHome();
    }

});


