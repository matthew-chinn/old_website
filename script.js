$(document).ready(function(){
    /*var count = 0;
    $('#button').click(function(){
          $('#des').fadeToggle('400');
          $('#des2').fadeToggle('500');
    });
    $('#middle').click(function(){
        if(count === 0)
        {
            $('#troll').append("<img src='face.jpg'>");
            count++;
        }
    });*/
        $('#name').animate({fontSize: '50px' }, "slow");
        $('#about').animate({
            position:'absolute',
            top:'180px',
            left:'280px'
        }, "slow");
        $('#contact').animate({
            position:'absolute',
            top:'180px',
            right:'260px'
        }, "slow");
        $('#resume').animate({
            position:'absolute',
            bottom:'180px',
            left:'280px'
        }, "slow");
        $('#game').animate({
            position:'absolute',
            bottom:'180px',
            right:'280px'
        }, "slow");



    
});
