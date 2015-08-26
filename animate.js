var FORWARD = true;
var BACKWARD = false;

$(document).ready(function(){
    var svg = $('#svg');
    var time = 3000;
    var distance = parseInt($('body').width()) - 200;
    svg.velocity({translateX:""+distance+"px"}, time);
    var leftWheel = $('#leftwheel');
    var leftInnerWheel = $('#leftinnerwheel');
    rotateWheel(leftWheel, leftInnerWheel, time, distance, 3, FORWARD);
    var rightWheel = $('#rightwheel');
    var rightInnerWheel = $('#rightinnerwheel');
    rotateWheel(rightWheel, rightInnerWheel, time, distance, 0, FORWARD);
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
