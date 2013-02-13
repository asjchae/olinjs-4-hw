

$(document).ready(function () {

  $('#tweet').on('submit', function () {
  	var text = $('#tweeting').val();
  	if (text.length > 140) {
  		alert("Cannot exceed 140 characters.");
  	} else {
  		$.post("/tweets/:user", $('#tweet').serialize());
  	}
    
    return false;

  });

});


$(document).ready(function() {
	setInterval(function() {
		$.get("/tweets/update", {}, function(data){
			$('#tweetrefresher').html(data);
		});
	}, 1000);
});