var FORWARD = true;
var BACKWARD = false;
var RIGHT = true;
var LEFT = false;

var checkbox, checked;
var animation1, animation2, bodyWidth, height, leftWheel, 
    leftInnerWheel, rightWheel, rightInnerWheel;
var cookieX, cookieY, runnerX, runnerY, cookie, runnerSpeed, repeat, prevFace;
    //for chase the mouse
var runnerbutton, runnerBody, runnerFatBody, runnerRLeg, runnerLLeg, 
    runnerRArm, runnerLArm, runnerREye, runnerMouth;

$(document).ready(function(){
    checkbox = $('#animateCheckbox');
    checked = false;
    var animationCount = 0;
    var totalNumAnimations = 3;
    var animation = $('#animation');
    runner = $('#runner');

    checkbox.click(function(){
        checked = !checked;
        if(!checked)
        {
            animation.addClass("hide");
            runner.addClass("hide");
        }
        else
        {
            animation.removeClass("hide");
            if(animationCount === totalNumAnimations)
                runner.removeClass("hide");
        }
    
        if(checked && animationCount === 0)
        {
            height = $(document).height();
            bodyWidth = parseInt($(document).width());
            runnerbutton = $('#runnerbutton');
            animation1 = $('#animation1');
            animation2 = $('#animation2');
            leftWheel = $('#animation1 #leftwheel');
            leftInnerWheel = $('#animation1 #leftinnerwheel');
            rightWheel = $('#animation1 #rightwheel');
            rightInnerWheel = $('#animation1 #rightinnerwheel');

            cookie = $('#cookie');
            runnerX = runner.css("left");
            runnerY = runner.css("top");
            runnerSpeed = 5;

            animationCount = animate(animationCount);

            $('#buttons a').click(function(){
                if(checked && animationCount < totalNumAnimations)
                    animationCount = animate(animationCount);
            });
        }
    });

});

function startRunner()
{
    runnerbutton.removeClass("hide")
                      .velocity("fadeIn", 500);
    runnerbutton.click(function(e){
        runner.removeClass("hide");

        //initialize selector variables
        runnerBody = $('#runner svg #body');
        runnerFatBody = $('#runner svg #fatbody');
        runnerRLeg = $('#runner svg #rightleg');
        runnerLLeg = $('#runner svg #leftleg');
        runnerRArm = $('#runner svg #rightarm');
        runnerLArm = $('#runner svg #leftarm');
        runnerREye = $('#runner svg #righteye');
        runnerMouth = $('#runner svg #mouth');
        
        if(runnerBody.css("visibility") === "hidden")
        {
            runnerBody.css("visibility","visible");
            runnerFatBody.css("visibility", "hidden");
        }
        prevFace = RIGHT;
        cookie.removeClass("hide");
        layTreat(e);
        $(document).click(function(e){
            layTreat(e);
        });
        chaseTheCookie();
    });

}

//runner chase the cookie
function chaseTheCookie()
{
    var faceNow = RIGHT; //direction facing now
    repeat = true;
    var right = 0;
    var down = 0;
    var time = 200;
    runnerX = parseInt(runner.css("left"));
    runnerY = parseInt(runner.css("top"));
    var xCompensate = 20; //center the runner
    var yCompensate = 30;

    if(runnerX + xCompensate - cookieX > runnerSpeed)
    {
        right = -1 *runnerSpeed;
        faceNow = LEFT;
    }
    else if(runnerX + xCompensate - cookieX < (-1 * runnerSpeed))
    {
        right = runnerSpeed;
        faceNow = RIGHT;
    }
    if(runnerY + yCompensate - cookieY > runnerSpeed)
        down = -1 * runnerSpeed;
    else if(runnerY+ yCompensate - cookieY < (-1 * runnerSpeed))
        down = runnerSpeed;

    if(right === 0 && down === 0)
    {
        repeat = false;
        cookie.addClass("hide");
        runnerBody.css("visibility","hidden");
        runnerFatBody.css("visibility", "visible");
    }
    if(prevFace != faceNow) //face should swap
    {
        switchDirection();
        prevFace = faceNow;
    }

    runAnimation(faceNow, time);

    //translateZ for hardware acceleration
    runner.velocity({left:""+(runnerX+right)+"px", translateZ:0},
                    {duration:time, queue:false})
          .velocity({top:""+(runnerY+down)+"px"},
                    {duration:time, queue:false});
    if(repeat)
        setTimeout(function(){chaseTheCookie();}, time*2);
}

var legAngle = 3;
var rightLegNormal = "M23,40 l0,10";
var rightLegRunRight1 = "M23,40 l"+legAngle+",5 l-5,5";
var rightLegRunRight2 = "M23,40 l"+legAngle+",10";
var rightLegRunLeft1 = "M23,40 l"+(-1*legAngle)+",5 l5,5";
var rightLegRunLeft2 = "M23,40 l"+legAngle+",10";

var leftLegNormal = "M17,40 l0,10";
var leftLegRunRight1 = "M17,40 l"+legAngle+",5 l-5,5";
var leftLegRunRight2 = "M17,40 l"+(-1*legAngle)+",10";
var leftLegRunLeft1 = "M17,40 l"+(-1*legAngle)+",5 l5,5";
var leftLegRunLeft2 = "M17,40 l"+(-1*legAngle)+",10";
var step = true;

function runAnimation(facing, time)
{
    runnerRLeg.attr("d",rightLegNormal);
    runnerLLeg.attr("d", leftLegNormal);

    setTimeout(function(){
        if(facing === RIGHT)
        {
            if(step)
            {
                runnerRLeg.attr("d", rightLegRunRight1);
                runnerLLeg.attr("d", leftLegRunRight2);
            }
            else
            {
                runnerRLeg.attr("d", rightLegRunRight2);
                runnerLLeg.attr("d", leftLegRunRight1);
            }
        }
        else if(facing === LEFT)
        {
            if(step)
            {
                runnerLLeg.attr("d", leftLegRunLeft1);
                runnerRLeg.attr("d", rightLegRunLeft2);
            }
            else
            {
                runnerLLeg.attr("d", leftLegRunLeft2);
                runnerRLeg.attr("d", rightLegRunLeft1);
            }
        }
        step = !step;
    }, time/2);
}
        


var leftArmDataOne = "M20,30 l1,5 l5,0";
var leftArmDataTwo = "M20,30 l-1,5 l-5,0";
var rightArmDataOne = "M27,33 l2,0";
var rightArmDataTwo = "M13,33 l-2,0";

function switchDirection()
{
    var center = 20; //center of the face, where left eye is
    var eyeOffset = parseInt(runnerREye.attr("cx")) - center;
    eyeOffset *= -1; //flip
    runnerREye.attr("cx", ""+(center + eyeOffset));
    var mouthOffset = parseInt(runnerMouth.attr("cx")) - center;
    mouthOffset *= -1;
    runnerMouth.attr("cx",""+(center + mouthOffset));
    if(runnerLArm.attr("d") === leftArmDataOne) //facing right
    {
        runnerLArm.attr("d", leftArmDataTwo);
        runnerRArm.attr("d", rightArmDataTwo);
    }
    else
    {
        runnerLArm.attr("d", leftArmDataOne);
        runnerRArm.attr("d", rightArmDataOne);
    }
}


//update mouseX and Y
function layTreat(e)
{
    cookieCompensate = parseInt(cookie.css("width")) / 2;
    cookieX = e.clientX - cookieCompensate;
    cookieY = e.clientY - cookieCompensate;
    cookie.css("top",cookieY)
          .css("left", cookieX);
}

//animate according to what number in sequence
function animate(count)
{
    height = $(document).height(); //redo in case user changed window
    bodyWidth = parseInt($('body').width());
    switch(count){
        case 0: //initial forward
            var distance = bodyWidth; //for initial travel forward
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
            animation2.velocity({translateY:""+height*2+"px"}, 
            {duration:fallTime, visibility:"visible", display:"none"});
            break;

        case 2: //wagon fly up
            var rotateTo = 0; //amount to change angle into
            var time = 5000; //time rainbow shimmers
            var finalX = 0;
            var finalY = -300;
            rotateWheel(leftWheel, leftInnerWheel, time, bodyWidth, 3,
                BACKWARD);
            rotateWheel(rightWheel, rightInnerWheel, time, bodyWidth, 0,
                BACKWARD);
            animation1.velocity("fadeIn", 1);
            animation1.velocity({translateX:""+finalX+"px",
                                 translateY:""+finalY+"px",
                                 translateZ:0}, 
                                {duration:time, 
                                 begin:function(){
                                     makeRainbow($('.wagon'),time);
                                     flipWagon();
                                     rotate();},
                                 complete:startRunner});
            function rotate(){
                setTimeout(function(){
                    animation1.velocity({rotateZ:""+rotateTo+"deg"}, 
                            {duration:time, queue:false});
                }, time/5);
            }
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
