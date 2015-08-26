var FORWARD = true;
var BACKWARD = false;

$(document).ready(function(){
    var animation1 = $('#animation1');
    var animation2 = $('#animation2');
    var time = 3000;
    var distance = parseInt($('body').width()) - 170;
    var height = 1000;
    //animation1.hide();
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

    $('.startUp a').click(function(){
        animation1.velocity("fadeOut", 10);
        animation2.velocity({translateY:""+height+"px"}, 
        {duration:1000, visibility:"visible", display:"none"});
    });

});

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
