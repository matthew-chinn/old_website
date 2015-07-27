$(document).ready(function(){
    $('#header').fadeIn("1000");
    $('#welcome').fadeIn("500");
    $('#firstinstruction').fadeIn("500").removeClass("hidden");
    var instruction = 0;
    $('#next').click(function(){
        $('.activeInstruction').fadeOut("500").removeClass("activeInstruction");
        if(instruction === 0)
        {
            $('#secondinstruction').addClass("activeInstruction");
            instruction++;
        }
        else if(instruction === 1)
        {
            $('#thirdinstruction').addClass("activeInstruction");
            instruction++;
        }
        else
        {
            $('#fourthinstruction').addClass("activeInstruction");
            instruction++;
        }
        if(instruction === 4)
        {
            skipToStart();
        }
        else
        {
            $('.activeInstruction').fadeIn("500").removeClass("hidden");
        }
    });
    $('#skip').click(skipToStart);
            
});

var cpuFacedown;
var playerFacedown;
var cpuHand;
var playerHand;
var playerFaceup;
var cpuFaceup;

var deck = [];
var pile = [];

var initializeGame = function(){
    deck = shuffleDeck();
    cpuFacedown = [];
    playerFacedown = [];
    cpuHand = [];
    playerHand = [];
    playerFaceup = [];
    cpuFaceup = [];

    for(var i = 0; i < 6; i++)
    {
		if(i < 3)
		{
			cpuFacedown.push(deck.pop());
			playerFacedown.push(deck.pop());
		}
        cpuHand.push(deck.pop());
        playerHand.push(deck.pop());
    }
    
    var numSelected = 0;
    makeCard(playerHand, "playerhand");

    $('.card').click(function(){
        if($(this).hasClass("selected"))
        {
            $(this).removeClass("selected");
            numSelected--;
        }
        else
        {
            $(this).addClass("selected");
            numSelected++;
        }
    });

    $('#startGame').click(function(){
        if(numSelected != 3)
        {
            $('#pickAgain').fadeIn("500");
        }
        else
        {
			$(this).fadeOut("500");
            $('#pickAgain').fadeOut("500");
            $('.selected > p').each(function(){
                var value = $(this).html();
				removeCard(playerHand, "playerhand", value);
				playerFaceup.push(value);
			}); 

            $('.selected').removeClass("selected");

            //player cards
            makeCard(playerFaceup, "playerfaceup");
            makeCard(playerFacedown, "playerfacedown", "facedown");

            //cpu cards
            makeCard(cpuHand, "cpuhand", "facedown");

			//choose cpu's faceup cards
			for(var i = 0; i < cpuHand.length; i++)
			{
				if(i < 3) //choose first three as default
				{
					cpuFaceup.push(cpuHand[i]);
				}
				else //switch out if there are better cards
				{
					var comp = cpuHand[i];
					for(var j = 0; j < cpuFaceup.length; j++)
					{
						if(compareCards(comp, cpuFaceup[j], "cpuAI") > 0)
						{
							var temp = cpuFaceup[j];
							cpuFaceup[j] = comp;
							comp = temp;
						}
					}
				}
			}
			$(cpuFaceup).each(function()
			{
				removeCard(cpuHand, "cpuhand", this.toString());
			});
            makeCard(cpuFaceup, "cpufaceup");
            makeCard(cpuFacedown, "cpufacedown", "facedown");
			$('.start').fadeIn("500");
			gamePlay();
		}
    });
};

function gamePlay(){
	playerTurn();
}

function playerTurn(){
	console.log(pile);
	if(playerHand.length !== 0)
	{
		$('#playerhand .card').click(function(){
			var cardClicked = $(this).children("p").html();
			if(pile.length === 0 || compareCards(cardClicked, pile[pile.length-1]) >= 0)
			{
				pile.push(cardClicked);
				removeCard(playerHand, "playerhand", cardClicked);
				redoPile();
				cpuTurn();
			}
		});
		$('#pickup').click(function(){
			pickupPile(PLAYER);
		});
	}

}

function cpuTurn(){
	if(cpuHand.length !== 0)
	{
		cpuHand.sort(function(a,b){return compareCards(a,b)}); 
		//check worst cards first
		for(var i = 0; i < cpuHand.length; i++)
		{
			if(pile.length === 0 || compareCards(cpuHand[i], pile[pile.length-1]) >= 0)
				break; //this card is eligible
		}
		if(i < cpuHand.length)
		{
			pile.push(cpuHand[i]);
			removeCard(cpuHand, "cpuhand", cpuHand[i]);
			redoPile();
			playerTurn();
		}
		else
		{
			pickupPile(CPU);
		}
	}
}

var PLAYER = true;
var CPU = false;
//who: either "PLAYER" or "CPU"
function pickupPile(who){
	if(who === PLAYER)
	{
		makeCard(pile, "playerhand");
		playerHand = playerHand.concat(pile);
		pile=[];
		redoPile();
		cpuTurn();
	}
	else
	{
		makeCard(pile, "cpuhand", "facedown");
		cpuHand = cpuHand.concat(pile);
		pile=[];
		redoPile();
		playerTurn();
	}
}


function redoPile(){
	$('#pile').empty();
	if(pile.length > 0)
	{
		var topCard = [ pile[pile.length-1] ];
		makeCard(topCard, "pile");
	}
	
}

var skipToStart = function(){
    $('.activeInstruction').fadeOut("500").removeClass("activeInstruction");
    $('#welcome').fadeOut("500");
	$('#game').fadeIn("500").addClass("active").removeClass("hidden");
    initializeGame();
};

var getRandomCard = function(){
    var num = Math.floor((Math.random()*52)+1);
    return num;
};

var shuffleDeck = function(){
    var deck = [];
    var count = 0;
    while(deck.length != 52)
    {
        var card = getRandomCard();
        if(deck.indexOf(card) === -1)
        {
            deck[count] = card;
            count++;
        }
    }
	for(var i = 0; i < 52; i++)
	{
		deck[i] = getCardValue(deck[i]);
	}
    return deck;
}

//array for the cards, num in the array to make, what div to place card in
//cardClass: blank, "facedown"
var makeCard = function(array, divId, cardClass){
    for(var i = 0; i < array.length; i++)
    {
        div = document.getElementById(divId);
        var cardOutline = document.createElement("DIV"); //div for card
        var cardValue = document.createElement("P"); //p for card's value
		var card = document.createTextNode(array[i]);
        cardValue.appendChild(card);
        cardOutline.appendChild(cardValue);
        div.appendChild(cardOutline);
        $(cardOutline).addClass("card");
        if(typeof cardClass !== "undefined")
        {
            $(cardOutline).addClass(cardClass);
        }
    }
}

//get the card value (2-10, J Q K A) given the number (1-52)
var getCardValue = function(num)
{
    var temp = Math.ceil(num / 4);
    switch(temp)
    {
        case 1: 
            temp = 'A';
            break;
		case 11:
			temp = 'J';
			break;
		case 12:
			temp = 'Q';
			break;
		case 13:
			temp = 'K';
			break;
		default:
			temp = temp.toString();
	}
	return temp;
}

//return numeric value (2-14) of a card, for face cards
//Ace returns 14 so that it is a higher number for comparisons
var getCardNumValue = function(card)
{
	switch(card)
	{
		case 'A':
			return 14;
		case 'K':
			return 13;
		case 'Q':
			return 12;
		case 'J':
			return 11;
		default:
			return parseInt(card);
	}
}


//array that cards are being removed from, divId of the div to modify, value of
//card to be removed
var removeCard = function(array, divId, value)
{
	var loc = array.indexOf(value);
	array.splice(loc, 1);

    if($('#'+divId).hasClass("facedown"))
    {
		$('#'+divId).empty();
		makeCard(array, divId, "facedown");
    }
	else
	{
		$('#'+divId).empty();
		makeCard(array, divId);
	}
}

//returns 1 if last card is a higher value than the previous
//(unless prev == 7) or is a special card, else return -1
//misc represents any third parameter that may be used
var compareCards = function(last, prev, misc)
{
	if(last === prev)
		return 2;
	if(last === '2' || last === '7' || last === '10')
		return 1;
	if(typeof misc === "undefined")
	{
		if(getCardNumValue(last) > getCardNumValue(prev))
			return 1;
		return -1;
	}
	else if(misc === "isSeven")
	{
		if(getCardNumValue(last) < 7)
			return 1;
		return -1;
	}
	else if(misc === "cpuAI") //choosing the three faceup cards
	{
		if(prev === '2' || prev === '7' || last === '10')
			return -1;
		else if(getCardNumValue(last) > getCardNumValue(prev))
			return 1;
		else
			return -1;
	}
}
	
	


/*  Format for prototype functions
    Card.prototype.getValue = function(){
    return this.value;
}*/
