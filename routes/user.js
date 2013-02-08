var User = require('../models/userschema')
        , mongoose = require('mongoose');


/*
 * GET users listing.
 */

exports.list = function(req, res){
	res.send("respond with a resource");
};

exports.new = function(req, res) {
	res.render('newUser', {title: "Sign In"});
};


exports.login = function(req, res) { 
    User.findOne({name: req.body.name}), function(err, response) {
        if (err) {
            console.log("Problem logging in", err);
        } else if (!response) {
            var user = new User({name: req.body.name});
            user.save(function (err) {
                if (err) {
                    console.log("Problem saving user", err);
                } else {
                    login(req, res, user);
                }
            })
        } else {
            login(req, res, user);
        } 
    }
}

function login(req, res, user) {
    req.session.user = user;
    return res.redirect('/');
}