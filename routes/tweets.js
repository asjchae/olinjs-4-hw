var User = require('../models/userschema')
        , mongoose = require('mongoose');

var Tweet = require('../models/tweetschema')
		, mongoose = require('mongoose');

exports.main = function(req, res) {
	var recentTweets = Tweet.find({}).exec(function (err, response) {
		if (err) {
			return console.log("error", err);
		} else {
			res.render('tweets', {title: "Crappy Twitter", recent: response})
		}
	});
}

exports.refresh = function(req, res) {
	var tweet = new Tweet({tweet: req.body.tweet});
	tweet.save(function (err) {
		if (err) {
			console.log("Problem saving tweet", err);
		} else {
			console.log("Tweet successful");
			res.send("Tweet successful.");
		}
	});
}

exports.all = function(req, res) {
	var allTweets = Tweet.find({}).exec(function (err, response) {
		if (err) {
			return console.log("error", err);
		} else {
			res.render('allTweets', {title: "All tweets", allTweets: response});
		}
	});
}