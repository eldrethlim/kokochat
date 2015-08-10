var runAnimations = function(e, remove, animation) {
  $(e).removeClass(remove).addClass('animated ' + animation);

  setTimeout( function() {
    $(e).removeClass('animated ' + animation);
  }, 1000);
};

$(document).ready(function() {

  runAnimations($('#title'), 'hide', 'animated fadeInDown');
  setTimeout(function() {
    runAnimations($('#chat-button'), '', 'animated pulse')
  }, 1000);
});