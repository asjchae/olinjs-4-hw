var User = require('../models/userschema')
        , mongoose = require('mongoose');

var Tweet = require('../models/tweetschema')
		, mongoose = require('mongoose');

//StackOverflow sort function from Madison's repo 
Array.prototype.sortByProp = function(p){
	return this.sort(function(a,b){
		return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
	});
};

exports.main = function(req, res) {
	var recentTweets = Tweet.find({}).exec(function (err, response) {
		if (err) {
			return console.log("error", err);
		} else {
			var twits = response.sortByProp('datetime');
			response = twits.reverse();
			res.render('tweets', {title: "Crappy Twitter", recent: response})
		}
	});
}

exports.refresh = function(req, res) {
	if (req.body.tweeting.length <= 140 && req.body.tweeting.length > 0 && req.session.user != undefined) {
		var tweet = new Tweet({tweet: req.body.tweeting, username: req.session.user, created: new Date()});
		tweet.save(function (err) {
			if (err) {
				console.log("Problem saving tweet", err);
			} else {
				res.send("Tweet successful.");
			}
		});
	} else {
		res.send("Tweet exceeds 140 characters");
	}
}

exports.update = function(req, res) {
	Tweet.find({}).exec(function (err, response) {
		if (err) {
			return console.log("error", err);
		} else {
			var twits = response.sortByProp('datetime');
			response = twits.reverse();
			res.render('_tweets', {recent: response})
		}
	});
}

exports.delete = function(req, res) {
	Tweet.remove({}).exec(function (err, response) {
		if (err) {
			return console.log("error", err);
		} else {
			console.log("Deleted all tweets");
			res.redirect('/')
		}
	})
}