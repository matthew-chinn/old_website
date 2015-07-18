$(document).ready(function(){
    var count = 0;
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
