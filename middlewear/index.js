/**
 * Created by zhangran on 14-8-11.
 */

var models = require('../models');
var User = models.User;

exports.authChecker = function(req,res,next){

    if(req.session.user){
        res.locals.name = req.session.user.name;
        next();
        return;
    }

    var id = req.cookies.id;

    if(!id){
        res.redirect('./user_login');   //重定向循环
        return;
    }

    User.findById(id,function(err,user){

        if(err){
            next();
            return;
        }

        req.session.user = user;
        res.locals.name = user.name;
        next();
    });

};

exports.addUser = function(req,res,next){

    //console.log(req.session.user);
    if(req.session.user){
        res.locals.name = req.session.user.name;
        next();
        return;
    }

    var id = req.cookies.id;

    //console.log(id);
    if(!id){
        res.locals.name = null;
        next();
        return;
    }

    User.findById(id,function(err,user){

        if(err){
            next();
            return;
        }

        if(user){
            req.session.user = user;
            res.locals.name = user.name;
        }else{
            res.locals.name = null;
        }

        next();
    });

};