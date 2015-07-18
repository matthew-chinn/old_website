$(document).ready(function(){
	var box = $('#petitionBox');
	var trickOn = false; //period press toggles true or false
    $('#petitionButton').click(petitionClicked);
    $('#questionButton').click(gameClicked);
	$('#petitionBox').keydown(function(event){
		if( box.val() == "" && event.which == 190) //user entered a period
		{
			trickOn = true;
		}
		else if(event.which == 190 && trickOn) //second period entered
		{
			trickOn = false;
		}
		if(trickOn)
		{
			box.val("");
		}
		if(event.which == 13){ //enter key pressed
			petitionClicked();
		}
	});
    $('#petitionBox').keyup(function(event) {
		if(trickOn)
		{
			if( count != 1 ) //don't include the period
			{
				userAnswer += String.fromCharCode(event.which);
			}
			var temp = "";
	   		if(count < message.length)
	 		{
				temp = message.substr(0, count);
				count++;
	 		}	
			else
			{
				temp = message;
			}
			box.val(temp);
		}
		else if( count != 1 && event.which == 190 )//second period was placed
		{
			box.val(message.substr(0,count));
			count++;
		}
	});
	$('#questionBox').keypress(function(event){
		if(event.which == 13){ //enter key
			gameClicked();
		}
	});
});

var userAnswer = ""; //the user's "petition" or answer to question
var userQuestion = "";
var count = 1; //count place in petition message
var message = "I humbly submit my request to Matthew.";

function petitionClicked(){
    $('#petition').fadeOut(1000);
	$('#petition').css("display", "none");
    $('#game').fadeIn(1200);
}

function gameClicked(){
    userQuestion = $('#questionBox').val();
    $('#game').fadeOut(1000);
	$('#game').css("display", "none");
	var ans = "Matthew doesn't feel like answering your question ";
		ans += "right now";
	if( userAnswer != "" ){
		ans = userAnswer
	}
	$('#inputtedAnswer').html(ans);
    $('#inputtedQuestion').html(userQuestion);
    $('#answer').fadeIn(1000);
}

