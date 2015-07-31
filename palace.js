$(document).ready(function(){
    //$('#header').fadeIn("1000");
    //$('#welcome').fadeIn("500");
    //$('#firstinstruction').removeClass("hidden");
    var instruction = 0;
    $('#next').click(function(){
        var temp = $('.activeInstruction');
        temp.removeClass("activeInstruction").addClass("hidden");
        temp.next().addClass("activeInstruction").removeClass("hidden");
        instruction++;
        
        if(instruction === 4)
        {
            skipToStart();
        }
        
    });
    $('#skip').click(skipToStart);
            
});

var skipToStart = function(){
    $('.activeInstruction').fadeOut("500").removeClass("activeInstruction");
    $('#welcome').fadeOut("500");
	$('#game').fadeIn("500").addClass("active").removeClass("hidden");
    initializeGame();
};

var cpuFacedown;
var playerFacedown;
var cpuHand;
var playerHand;
var playerFaceup;
var cpuFaceup;

var deck;
var pile;

var initializeGame = function(){
    deck = shuffleDeck();
    cpuFacedown = [];
    playerFacedown = [];
    cpuHand = [];
    playerHand = [];
    playerFaceup = [];
    cpuFaceup = [];
    pile = [];

    for(var i = 0; i < 6; i++) //deal 6 per hand, 3 per facedown pile
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
            $('#deck #remainingCards').html(deck.length);
            $('#chooseThree').fadeOut("500");
			gamePlay();
		}
    });
};

function gamePlay(){
	playerTurn();
}

function playerTurn(){
    var cardChosen;
    var numChosen = 0;

    $('#playerfacedown').off();
    
	if(playerHand.length !== 0)
	{
        $('#playerfaceup').off();
        $('#playerhand').off();
		$('#playerhand').on('dblclick', '.card', function(){
            playerDblClick(this);
        });
		$('#playerhand').on('click', '.card', function(){
            var temp = playerClick(this, cardChosen, numChosen);
            numChosen = temp[0];
            cardChosen = temp[1];
        });
    }

    else if(playerFaceup.length !== 0)
    {
        $('.faceupdown').css("z-index", "1");
        $('#playerfaceup').off();
        $('#playerfaceup').on('dblclick', '.card', function(){
            playerDblClick(this);
        });
        $('#playerfaceup').on('click', '.card', function(){
            var temp = playerClick(this, cardChosen, numChosen);
            numChosen = temp[0];
            cardChosen = temp[1];
        });
    }

    else if(playerFacedown.length !== 0) //facedown cards
    {
        $('#playerfacedown').on('dblclick', '.card', function(){
            playerDblClick(this, FACEDOWN);
        });
    }

    else
    {
        winScreen();
    }

    $('#select').unbind("click").click(function(){
        if(numChosen > 0)
        {
            console.log("player push: " + cardChosen + " " + numChosen + "x");
            playCard(cardChosen, numChosen, PLAYER);
        }
    });

    $('#pickup').unbind("click").click(function(){
        if(pile.length !== 0)
            pickupPile(PLAYER);
    });
}

function cpuTurn(){
	if(cpuHand.length !== 0)
	{
        cpuPlayCard(cpuHand);
	}
    else if(cpuFaceup.length !== 0)
    {
        cpuPlayCard(cpuFaceup);
    }
    else if(cpuFacedown.length !== 0)
    {
        cpuPlayFacedownCard();
    }
    if(cpuFacedown.length === 0 && cpuHand.length === 0)
        loseScreen();
}

function cpuPlayFacedownCard()
{
    var num = Math.floor(Math.random() * cpuFacedown.length);
    if(compareTopCard(cpuFacedown[num]) >= 0)
    {
        playCard(cpuFacedown[num], 1, CPU);
        var prevMove = $('#cpumove').html();
        $('#cpumove').html(prevMove + " " +cpuFacedown[num]+ " (" + 1 + "x)");
    }
    else
    {
        pile.push(cpuFacedown[num]);
        var prevMove = $('#cpumove').html();
        $('#cpumove').html(prevMove + " " +cpuFacedown[num]+ " (" + 1 + "x)");
        removeCard(cpuFacedown, "cpufacedown", cpuFacedown[num]);
        pickupPile(CPU);
    }

}


function cpuPlayCard(array)
{
    array.sort(function(a,b){return compareCards(a,b)}); 
		//check worst cards first
        var i = 0;
        var numCards = 1;
		for(i; i < array.length; i++)
		{
			if(pile.length === 0 || (compareTopCard(array[i]) >= 0) )
            {
				break; //this card is eligible
            }
		}

        for(var j = 1; j < 4; j++) //check if cpu has more than one
        {
            if((i+j < array.length) && 
                compareCards(array[i], array[i+j]) === 0)
            {
                console.log("cpu has more than one");
                numCards++;
            }
            else
            {
                break;
            }
        }           
		if(i < array.length)
		{
            var cardPlayed = array[i];
            console.log("cpu push " + cardPlayed + " " + numCards + "x");
            var prevMove = $('#cpumove').html();
            $('#cpumove').html(prevMove + " " + cardPlayed + 
                " (" + numCards + "x)");
            playCard(cardPlayed, numCards, CPU);
            console.log("pile: " + pile);
        }
		else
		{
			pickupPile(CPU);
		}
}

function playCard(cardChosen, numChosen, who)
{
    //clear cpu move if player goes
    if(who === PLAYER)
        $('#cpumove').html("");
    for(var i = numChosen; i > 0; i--)
    {
        pile.push(cardChosen);
    }
   
    for(var i = numChosen; i > 0; i--)
    {
        if(who === PLAYER)
        {
            if(playerHand.length > 0)
                removeCard(playerHand, "playerhand", cardChosen);
            else if(playerFaceup.length > 0)
                removeCard(playerFaceup, "playerfaceup", cardChosen);
            else
                removeCard(playerFacedown, "playerfacedown", cardChosen);
        }
        else
        {
            if(cpuHand.length > 0)
                removeCard(cpuHand, "cpuhand", cardChosen);
            else if(cpuFaceup.length > 0)
                removeCard(cpuFaceup, "cpufaceup", cardChosen);
            else
                removeCard(cpuFacedown, "cpufacedown", cardChosen);
        }
    }
    if(checkBomb())
    {
        cardChosen = '10';
    }
    var repeat = false;
    switch(cardChosen)
    {
        case '10': bomb(who); repeat= true; break;
        case '2': repeat= true; break;
        default:
    }

    if(playerHand.length <= 3)
        $('#player').css("width", "300");
    if(cpuHand.length <= 3)
        $('#cpu').css("width", "300");
    redoPile();
    drawCard(who);

    if(repeat)
        repeatTurn(who);
    else
        switchTurn(who);

}

function playerClick(card, cardChosen, numChosen)
{
    console.log("player clicked");
    $('#startmsg').fadeOut("500");
    var cardChosenNext;
    if(typeof cardChosen === "undefined" || compareTopCard(cardChosen) < 0 )
    {
        cardChosen = $(card).children("p").html();
        console.log(cardChosen + " and " + compareTopCard(cardChosen));
    }
    cardChosenNext = $(card).children("p").html();
    
    if(pile.length === 0 || (compareTopCard(cardChosen) >= 0) )
    {
        console.log("cardChosen; " + cardChosen + " cardChosenNext: " +
            cardChosenNext);
        if(cardChosen !== cardChosenNext && 
                compareTopCard(cardChosenNext) >= 0) //diff value chosen
        {
            $('.selected').removeClass("selected");
            cardChosen = $(card).children("p").html();
            numChosen = 0;
        }

        if(compareTopCard(cardChosenNext) >= 0) //highlight card
        {
            if($(card).hasClass("selected"))
            {
                $(card).removeClass("selected");
                numChosen--;
            }
            else
            {
                $(card).addClass("selected");
                numChosen++;
            }
        }
    }
    return [numChosen, cardChosen];
}

var FACEDOWN = true;
//hand: FACEDOWN if user is on their facedown cards, cardsrc for facedown cards
function playerDblClick(cardsrc, hand)
{
    $('#startmsg').fadeOut("500");
    var cardChosen = $(cardsrc).children("p").html();
    if(pile.length === 0 || (compareTopCard(cardChosen) >= 0) )
    {
        console.log("player push: " + cardChosen + " " + "1x");
        playCard(cardChosen, 1, PLAYER);
    }
    else if(hand === FACEDOWN)
    {
        pile.push(cardChosen);
        pickupPile(PLAYER);
        removeCard(playerFacedown, "playerfacedown", cardChosen);
    }
}

//does compareCards, taking the top card into account
function compareTopCard(card)
{
    if(pile.length === 0)
        return 1;
    var topCard = pile[pile.length-1];
    if(topCard === '7')
    {
        return compareCards(card, topCard, "SEVEN");
    }
    else
    {
        return compareCards(card, topCard);
    }
}

function drawCard(who){
    if(deck.length > 0)
    {
        if(who === PLAYER)
        {
            if(playerHand.length < 3)
            {
                var temp = deck.pop();
                playerHand.push(temp);
                makeCard([temp], "playerhand");
            }
            if(playerHand.length < 3)
                drawCard(PLAYER);
        }
        else
        {
            if(cpuHand.length < 3)
            {
                var temp = deck.pop();
                cpuHand.push(temp);
                makeCard([temp], "cpuhand", "facedown");
            }
            if(cpuHand.length < 3)
                drawCard(CPU);
        }
        $('#deck #remainingCards').html(deck.length);
    }
}

function repeatTurn(who){
    if(who===PLAYER)
        playerTurn();
    else
        cpuTurn();
}

function switchTurn(who){
    if(who === PLAYER)
        cpuTurn();
    else
        playerTurn();
}

//checks if the top four cards are the same
function checkBomb()
{
    if(pile.length >= 4)
    {
        var compare = pile[pile.length-1];
        for(var i = 2; i < 5; i++)
        {
            if(compare !== pile[pile.length - i])
                return false;
        }
        console.log("four in a row");
        return true;
    }
    else
        return false;
}


//either a 10 or 4 of a kind
function bomb(who){
    console.log("bomb");
    pile = [];
    redoPile();
}

var PLAYER = true;
var CPU = false;
//who: either "PLAYER" or "CPU"
function pickupPile(who){
	if(who === PLAYER)
	{
        $('#cpumove').html("");
		makeCard(pile, "playerhand");
		playerHand = playerHand.concat(pile);
        if(playerHand.length > 3)
            $('#player').css("width", "400px");
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

//replace the top card of the pile to be displayed
function redoPile(){
	$('#pile').empty();
	if(pile.length > 0)
	{
		var topCard = [ pile[pile.length-1] ];
		makeCard(topCard, "pile");
	}
	
}

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
		return 0;
	if(last === '2' || last === '7' || last === '10')
		return 1;
	if(typeof misc === "undefined") 
	{
		if(getCardNumValue(last) > getCardNumValue(prev))
        {
			return 1;
        }
		return -1;
	}
	else if(misc === "SEVEN")
	{
		if(getCardNumValue(last) < 7)
        {
			return 1;
        }
		return -1;
	}
	else if(misc === "cpuAI") //choosing the three faceup cards
	{
		if(prev === '2' || prev === '7' || last === '10')
			return -1; //don't override when checking special cards
		else if(getCardNumValue(last) > getCardNumValue(prev))
			return 1;
		else
			return -1;
	}
}

function loseScreen(){
    $('#lose').fadeIn("500");
    $('#playagain').fadeIn("500");
    $('#playagain').click(initializeGame);
}

function winScreen(){
    $('#win').fadeIn("500");
    $('#playagain').fadeIn("500");
    $('#playagain').click(initializeGame);
}
	
	


/*  Format for prototype functions
    Card.prototype.getValue = function(){
    return this.value;
}*/
