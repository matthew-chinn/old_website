var about,contact,resume,project,runnerbutton,home,backtotop,buttons,aboutButtons,contactButtons,resumeButtons,projectButtons,homeButtons,transitionHome=function(){$("#name").velocity({fontSize:"50px"},"slow");about.velocity({position:"absolute",top:"30%",right:"71%"},"slow");contact.velocity({position:"absolute",top:"30%",right:"22%"},"slow");resume.velocity({position:"absolute",top:"70%",right:"70%"},"slow");project.velocity({position:"absolute",top:"70%",right:"22%"},"slow");runnerbutton.velocity({position:"absolute",
top:"60%",right:"48%"});home.fadeOut("500")},mq;
$(document).ready(function(){function a(a){a.matches||(about=$("#about"),contact=$("#contact"),resume=$("#resume"),project=$("#project"),home=$("#home"),$("#homepage").hasClass("active")?($(".startUp div:not(#runnerbutton, #home) a").click(function(){b()}),transitionHome()):b())}aboutButtons=$(".button.about a");contactButtons=$(".button.contact a");resumeButtons=$(".button.resume a");projectButtons=$(".button.project a");runnerbutton=$("#runnerbutton");homeButtons=$(".button.home a");backtotop=$(".backtotop");
buttons=$("#buttons");$(".button:not(#runnerbutton) a").click(function(){$(".active").fadeOut("500").removeClass("active")});aboutButtons.click(function(){$("#aboutpage").fadeIn("500").addClass("active");backtotop.addClass("hidden")});contactButtons.click(function(){$("#contactpage").fadeIn("500").addClass("active");backtotop.addClass("hidden")});resumeButtons.click(function(){$("#resumepage").fadeIn("500").addClass("active");backtotop.removeClass("hidden")});homeButtons.click(function(){$("#homepage").fadeIn("500").addClass("active");
buttons.addClass("startUp");backtotop.addClass("hidden");mq.matches||($("#name").css("fontSize","24px"),transitionHome())});projectButtons.click(function(){$("#projectpage").fadeIn("500").addClass("active");backtotop.removeClass("hidden")});mq=window.matchMedia("(max-width:750px)");mq.addListener(a);a(mq);var b=function(){about.velocity({top:"50px",right:"30px"});contact.velocity({top:"80px",right:"30px"});resume.velocity({top:"110px",right:"30px"});project.velocity({top:"140px",right:"30px"});runnerbutton.velocity({top:"170px",
right:"30px"});home.fadeIn("500");buttons.removeClass("startUp")}});var FORWARD=!0,BACKWARD=!1,RIGHT=!0,LEFT=!1,checkbox,checked,animation1,animation2,bodyWidth,height,leftWheel,leftInnerWheel,rightWheel,rightInnerWheel,cookieX,cookieY,runnerX,runnerY,cookie,runnerSpeed,repeat,prevFace,runnerBody,runnerFatBody,runnerRLeg,runnerLLeg,runnerRArm,runnerLArm,runnerREye,runnerMouth;
$(document).ready(function(){checkbox=$("#animateCheckbox");checked=!1;var a=0,b=$("#animation");runner=$("#runner");checkbox.click(function(){(checked=!checked)?(b.removeClass("hide"),3===a&&runner.removeClass("hide")):(b.addClass("hide"),runner.addClass("hide"));checked&&0===a&&(height=$(document).height(),bodyWidth=parseInt($(document).width()),runnerbutton=$("#runnerbutton"),animation1=$("#animation1"),animation2=$("#animation2"),leftWheel=$("#animation1 #leftwheel"),leftInnerWheel=$("#animation1 #leftinnerwheel"),
rightWheel=$("#animation1 #rightwheel"),rightInnerWheel=$("#animation1 #rightinnerwheel"),cookie=$("#cookie"),runnerX=runner.css("left"),runnerY=runner.css("top"),runnerSpeed=5,a=animate(a),$("#buttons a").click(function(){checked&&3>a&&(a=animate(a))}))})});
function startRunner(){runnerbutton.removeClass("hide").velocity("fadeIn",500);runnerbutton.click(function(a){runner.removeClass("hide");runnerBody=$("#runner svg #body");runnerFatBody=$("#runner svg #fatbody");runnerRLeg=$("#runner svg #rightleg");runnerLLeg=$("#runner svg #leftleg");runnerRArm=$("#runner svg #rightarm");runnerLArm=$("#runner svg #leftarm");runnerREye=$("#runner svg #righteye");runnerMouth=$("#runner svg #mouth");"hidden"===runnerBody.css("visibility")&&(runnerBody.css("visibility",
"visible"),runnerFatBody.css("visibility","hidden"));prevFace=RIGHT;cookie.removeClass("hide");layTreat(a);$(document).click(function(a){layTreat(a)});chaseTheCookie()})}
function chaseTheCookie(){var a=RIGHT;repeat=!0;var b=0,c=0;runnerX=parseInt(runner.css("left"));runnerY=parseInt(runner.css("top"));runnerX+20-cookieX>runnerSpeed?(b=-1*runnerSpeed,a=LEFT):runnerX+20-cookieX<-1*runnerSpeed&&(b=runnerSpeed,a=RIGHT);runnerY+30-cookieY>runnerSpeed?c=-1*runnerSpeed:runnerY+30-cookieY<-1*runnerSpeed&&(c=runnerSpeed);0===b&&0===c&&(repeat=!1,cookie.addClass("hide"),runnerBody.css("visibility","hidden"),runnerFatBody.css("visibility","visible"));prevFace!=a&&(switchDirection(),
prevFace=a);runAnimation(a,200);runner.velocity({left:""+(runnerX+b)+"px",translateZ:0},{duration:200,queue:!1}).velocity({top:""+(runnerY+c)+"px"},{duration:200,queue:!1});repeat&&setTimeout(function(){chaseTheCookie()},400)}
var legAngle=3,rightLegNormal="M23,40 l0,10",rightLegRunRight1="M23,40 l"+legAngle+",5 l-5,5",rightLegRunRight2="M23,40 l"+legAngle+",10",rightLegRunLeft1="M23,40 l"+-1*legAngle+",5 l5,5",rightLegRunLeft2="M23,40 l"+legAngle+",10",leftLegNormal="M17,40 l0,10",leftLegRunRight1="M17,40 l"+legAngle+",5 l-5,5",leftLegRunRight2="M17,40 l"+-1*legAngle+",10",leftLegRunLeft1="M17,40 l"+-1*legAngle+",5 l5,5",leftLegRunLeft2="M17,40 l"+-1*legAngle+",10",step=!0;
function runAnimation(a,b){runnerRLeg.attr("d",rightLegNormal);runnerLLeg.attr("d",leftLegNormal);setTimeout(function(){a===RIGHT?step?(runnerRLeg.attr("d",rightLegRunRight1),runnerLLeg.attr("d",leftLegRunRight2)):(runnerRLeg.attr("d",rightLegRunRight2),runnerLLeg.attr("d",leftLegRunRight1)):a===LEFT&&(step?(runnerLLeg.attr("d",leftLegRunLeft1),runnerRLeg.attr("d",rightLegRunLeft2)):(runnerLLeg.attr("d",leftLegRunLeft2),runnerRLeg.attr("d",rightLegRunLeft1)));step=!step},b/2)}
var leftArmDataOne="M20,30 l1,5 l5,0",leftArmDataTwo="M20,30 l-1,5 l-5,0",rightArmDataOne="M27,33 l2,0",rightArmDataTwo="M13,33 l-2,0";function switchDirection(){var a=parseInt(runnerREye.attr("cx"))-20;runnerREye.attr("cx",""+(20+-1*a));a=parseInt(runnerMouth.attr("cx"))-20;runnerMouth.attr("cx",""+(20+-1*a));runnerLArm.attr("d")===leftArmDataOne?(runnerLArm.attr("d",leftArmDataTwo),runnerRArm.attr("d",rightArmDataTwo)):(runnerLArm.attr("d",leftArmDataOne),runnerRArm.attr("d",rightArmDataOne))}
function layTreat(a){cookieCompensate=parseInt(cookie.css("width"))/2;cookieX=a.clientX-cookieCompensate;cookieY=a.clientY-cookieCompensate;cookie.css("top",cookieY).css("left",cookieX)}
function animate(a){height=$(document).height();bodyWidth=parseInt($("body").width());switch(a){case 0:var b=bodyWidth,c=b-100;animation1.velocity({translateX:""+b+"px"},3E3).velocity({translateX:""+c+"px"},{duration:2E3});animation2.velocity({translateX:""+b+"px"},{duration:3E3}).velocity({translateX:""+c+"px"},{duration:2E3});rotateWheel(leftWheel,leftInnerWheel,3E3,b,3,FORWARD);rotateWheel(rightWheel,rightInnerWheel,3E3,b,0,FORWARD);rotateWheel(leftWheel,leftInnerWheel,2E3,c,0,BACKWARD);rotateWheel(rightWheel,
rightInnerWheel,2E3,c,9,BACKWARD);break;case 1:b=bodyWidth;c=height;animation1.velocity("fadeOut",1).velocity({translateX:""+b+"px",translateY:""+c+"px"}).velocity({rotateZ:"80deg"});animation2.velocity({translateY:""+2*height+"px"},{duration:1E3,visibility:"visible",display:"none"});break;case 2:rotateWheel(leftWheel,leftInnerWheel,5E3,bodyWidth,3,BACKWARD),rotateWheel(rightWheel,rightInnerWheel,5E3,bodyWidth,0,BACKWARD),animation1.velocity("fadeIn",1),animation1.velocity({translateX:"0px",translateY:"-300px",
translateZ:0},{duration:5E3,begin:function(){makeRainbow($(".wagon"),5E3);flipWagon();setTimeout(function(){animation1.velocity({rotateZ:"0deg"},{duration:5E3,queue:!1})},1E3)},complete:startRunner})}return++a}
function makeRainbow(a,b){for(;0<b;)a.velocity({fill:"#D11919"},{duration:1E3,visibility:"visible"}).velocity({fill:"#FF9900"},1E3).velocity({fill:"#FFFF00"},1E3).velocity({fill:"#33CC33"},1E3).velocity({fill:"#0033CC"},1E3).velocity({fill:"#6600CC"},1E3),b-=6E3;a.velocity({fill:"url(#wagonColor)"})}
function flipWagon(){$("#animation1 #lefteye").attr("cx","85");$("#animation1 #leftinnereye").attr("cx","85");$("#animation1 #righteye").attr("cx","100");$("#animation1 #rightinnereye").attr("cx","100");$("#animation1 #mouth").attr("cx","90")}
function rotateWheel(a,b,c,e,d,g){var h=parseInt(a.attr("cx"));a=parseInt(a.attr("cy"));var f=Math.abs(parseInt(b.attr("cx"))-h);0===f&&(f=Math.abs(parseInt(b.attr("cy"))-a));var k=Math.PI/6;e/=2*Math.PI*f;for(c/=e;1<e;){var l=h+f*Math.cos(d*k),m=a+f*Math.sin(d*k);b.velocity({cx:l,cy:m},c);g===FORWARD?d++:d--;12===d&&g===FORWARD?d=0:0===d&&g===BACKWARD&&(d=12);e--}};
