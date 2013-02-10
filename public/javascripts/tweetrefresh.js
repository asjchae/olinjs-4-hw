$(function () {

  $('#composetweet').on('submit', function () {
  	if ($'#tweeting').val().length < 140 {
  		$.post("/tweets/:user", $('#composetweet').serialize());
  	} else {
  		// Display error here.
  	}
    return false;
  });

});