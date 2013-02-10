var mongoose = require('mongoose');

var tweetSchema = mongoose.Schema({
	tweet: String
});

var Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;