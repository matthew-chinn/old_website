var FORWARD = true;
var BACKWARD = false;
var animation1, animation2, bodyWidth, height, leftWheel, 
    leftInnerWheel, rightWheel, rightInnerWheel;

$(document).ready(function(){
    height = $(document).height();
    bodyWidth = parseInt($('body').width());
    animation1 = $('#animation1');
    animation2 = $('#animation2');
    leftWheel = $('#animation1 #leftwheel');
    leftInnerWheel = $('#animation1 #leftinnerwheel');
    rightWheel = $('#animation1 #rightwheel');
    rightInnerWheel = $('#animation1 #rightinnerwheel');
    
    var animationCount = 0;
    animationCount = animate(animationCount);

    $('#buttons a').click(function(){
        animationCount = animate(animationCount);
    });

});

//animate according to what number in sequence
function animate(count)
{
    switch(count){
        case 0: //initial forward
            var distance = bodyWidth - 170; //for initial travel forward
            var distanceBack = distance - 100;
            var timeForward = 3000; //for initial distance
            var timeBack = 2000;
            
            animation1.velocity({translateX:""+distance+"px"}, timeForward)
               .velocity({translateX:""+distanceBack+"px"}, 
               {duration:timeBack})

            animation2.velocity({translateX:""+distance+"px"}, 
                {duration:timeForward})
                .velocity({translateX:""+distanceBack+"px"}, 
                {duration:timeBack});

            rotateWheel(leftWheel, leftInnerWheel, timeForward, 
                distance, 3, FORWARD);
            rotateWheel(rightWheel, rightInnerWheel, timeForward, 
                distance, 0, FORWARD);

            //after impact go backwards
            rotateWheel(leftWheel, leftInnerWheel, timeBack, distanceBack, 0,
                BACKWARD);
            rotateWheel(rightWheel, rightInnerWheel, timeBack, distanceBack, 9,
                BACKWARD);
            break;

        case 1: //wagon freefall
            var rotate = 80; //angle to start at
            var fallTime = 1000;
            var move1ToX = bodyWidth;
            var move1ToY = height;
            animation1.velocity("fadeOut", 1)
                      .velocity({translateX:""+move1ToX+"px",
                                 translateY:""+move1ToY+"px"})
                      .velocity({rotateZ:""+rotate+"deg"});
            flipWagon();
            animation2.velocity({translateY:""+height*2+"px"}, 
            {duration:fallTime, visibility:"visible", display:"none"});
            break;

        case 2: //wagon fly up
            var rotateTo = 0; //amount to change angle into
            var time = 5000; //time rainbow shimmers
            var finalX = 0;
            var finalY = -300;
            makeRainbow($('.wagon'), time);
            rotateWheel(leftWheel, leftInnerWheel, time, bodyWidth, 3,
                BACKWARD);
            rotateWheel(rightWheel, rightInnerWheel, time, bodyWidth, 0,
                BACKWARD);
            animation1.velocity("fadeIn", 1);
            animation1.velocity({translateX:""+finalX+"px",
                                 translateY:""+finalY+"px"}, time)
            setTimeout(function(){
                animation1.velocity({rotateZ:""+rotateTo+"deg"}, 
                        {duration:time, queue:false});
            }, time/5);
            break;
    }
    return ++count;
}

function makeRainbow(element, time)
{
    var repeat = time/10;
    var transition = 1000;
    while(time > 0)
    {
        element.velocity({fill:"#D11919"}, {
                                            duration:transition,
                                            visibility:"visible"})
               .velocity({fill:"#FF9900"}, transition)
               .velocity({fill:"#FFFF00"}, transition)
               .velocity({fill:"#33CC33"}, transition)
               .velocity({fill:"#0033CC"}, transition)
               .velocity({fill:"#6600CC"}, transition);
        time-=transition*6;
    }
    element.velocity({fill:"url(#wagonColor)"}); //fade out to white
}

function flipWagon()
{
    var pre = "#animation1 ";
    $(pre + '#lefteye').attr("cx", "85");
    $(pre + '#leftinnereye').attr("cx", "85");
    $(pre + '#righteye').attr("cx", "100");
    $(pre + '#rightinnereye').attr("cx", "100");
    $(pre + '#mouth').attr("cx", "90");
}

function rotateWheel(wheel, innerWheel, time, distance, beginCount, direction){
    var x = parseInt(wheel.attr("cx"));
    var y = parseInt(wheel.attr("cy"));
    var r = Math.abs(parseInt(innerWheel.attr("cx")) - x);
    if(r === 0) //beginCount === 3 or 9
    {
        r = Math.abs(parseInt(innerWheel.attr("cy")) - y);
    }
    var radianPiece = Math.PI / 6;

    var count = beginCount; //count of radian pieces wheel has gone

    var repeat = distance / (2*Math.PI*r) ;
    var speed = time/repeat; //change accordingly
    while(repeat > 1)
    {
        var newCX = x + r * Math.cos(count*radianPiece);
        var newCY = y + r * Math.sin(count*radianPiece);

        innerWheel.velocity({cx:newCX, cy:newCY}, speed);
        if(direction === FORWARD)
            count++;
        else
            count--;
        if(count === 12 && direction === FORWARD)
        {
            count = 0;
        }
        else if(count === 0 && direction === BACKWARD)
        {
            count = 12;
        }
        repeat--;
        
    }
}
