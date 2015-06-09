$(document).ready(function(){
    var count = 0;
    $('a').mouseenter(function(){
        $(this).fadeTo("200", 1);
    });
    $('a').mouseleave(function(){
        $(this).fadeTo("200", .5);
    });
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
    });
});
