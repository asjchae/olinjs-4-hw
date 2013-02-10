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
    User.findOne({name: req.body.name}).exec(function (err, response) {
        if (err) {
            console.log("error");
        } else if (!response) {
            console.log("create new user");
            var user = new User({name: req.body.name});
            user.save(function (err) {
                if (err) {
                    console.log("Problem saving user", err);
                } else {
                    login(req, res, user);
                }
            })
        } else {
            console.log("already a user");
            login(req, res, user);
        }

    });
}

function login(req, res, user) {
    req.session.user = user;
    return res.redirect('/');
}