var FORWARD = true;
var BACKWARD = false;

$(document).ready(function(){
    var animation1 = $('#animation1');
    var animation2 = $('#animation2');
    var time = 3000;
    var bodyWidth = parseInt($('body').width());
    var distance = bodyWidth - 170;
    var height = $(document).height();
    var distanceBack = distance - 100;
    var timeBack = 2000;
    animation1.velocity({translateX:""+distance+"px"}, time)
       .velocity({translateX:""+distanceBack+"px"}, 
       {duration:timeBack})

    animation2.velocity({translateX:""+distance+"px"}, 
        {duration:time})
        .velocity({translateX:""+distanceBack+"px"}, 
        {duration:timeBack});

    var leftWheel = $('#leftwheel');
    var leftInnerWheel = $('#leftinnerwheel');
    rotateWheel(leftWheel, leftInnerWheel, time, distance, 3, FORWARD);
    var rightWheel = $('#rightwheel');
    var rightInnerWheel = $('#rightinnerwheel');
    rotateWheel(rightWheel, rightInnerWheel, time, distance, 0, FORWARD);

    //after impact go backwards
    rotateWheel(leftWheel, leftInnerWheel, timeBack, distanceBack, 0,
        BACKWARD);
    rotateWheel(rightWheel, rightInnerWheel, timeBack, distanceBack, 9,
        BACKWARD);

    //freefall
    $('.startUp a').click(function(){
        var rotate = 80; //angle to start at
        $('.startUp').removeClass("startUp");
        animation1.velocity("fadeOut", 1)
                  .velocity({translateX:""+(bodyWidth+100)+"px",
                             translateY:""+height+"px"})
                  .velocity({rotateZ:""+rotate+"deg"});
        flipWagon();
        animation2.velocity({translateY:""+height*2+"px"}, 
        {duration:1000, visibility:"visible", display:"none"});

        $('#buttons a').click(function(){
            //make wagon go up rainbow
            var rotateTo = 0; //amount to change angle into
            var time = 10000; //time rainbow shimmers
            animation1.velocity("fadeIn", 1);
            makeRainbow($('#rainbow'), time);
            animation1.velocity({translateX:""+(bodyWidth/2+100)+"px",
                                 translateY:"-300px"}, time)
                   //   .velocity({translateX:"-200px",
                   //              translateY:"-200px"}, time);
            setTimeout(function(){
                animation1.velocity({rotateZ:""+rotateTo+"deg"}, 
                        {duration:time, queue:false});
            }, time/5);
            $(this).unbind();
        });
    });

});

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
    element.velocity({fill:"#ffffff"}, {display:"none"}); //fade out to white
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
    var r = parseInt(innerWheel.attr("cx") - x);
    if(r === 0) //beginCount === 3 or 9
    {
        r = parseInt(innerWheel.attr("cy") - y);
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
