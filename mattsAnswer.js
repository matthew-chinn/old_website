$(document).ready(function(){
	var box = $('#petitionBox');
	var trickOn = false; //period press toggles true or false
    $('#petitionButton').click(petitionClicked);
    $('#questionButton').click(gameClicked);
	$('#petitionBox').keydown(function(event){
		/*console.log("first");
		console.log("test: " + ".".charCodeAt(0));
		console.log("count: " + count);
		console.log("event: " + event.which);
		console.log("preiod: " + String.fromCharCode(46));
		console.log("string: " + String.fromCharCode(event.which));*/
		if( count == 1 && event.which == 190) //user entered a period
		{
			trickOn = true;
		}
		else if(event.which == 190) //second period entered
		{
			trickOn = false;
		}
		if(trickOn)
		{
			box.val("");
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
		else if( event.which == 190 )
		{
			box.val(message.substr(0,count));
			count++;
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

