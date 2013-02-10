var mongoose = require('mongoose');

var tweetSchema = mongoose.Schema({
	tweet: String,
	username: String,
	created: Date
});

var Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;