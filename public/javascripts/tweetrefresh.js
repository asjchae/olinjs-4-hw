$(function () {

  $('#tweet').on('submit', function () {
    $.post("/tweets/:user", $('#tweet').serialize());
    return false;
  });

});