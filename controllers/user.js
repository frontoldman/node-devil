/**
 * Created by zhangran on 14-7-13.
 */

var User = require('../proxy').User;

exports.list = function(req,res,next){
    User.findAll(function(err,users){
        if(err){
            console.log(err);
            return;
        }
        res.render('user_list',{
            userList:users
        })
    });
};

exports.add = function(req,res,next){
    //console.log(req.param('name'));
    User.newAndSave(req.param('name'),req.param('password'),req.param('email'),req.param('age'),function(err){
        if(err){
            return next(err);
        }
        res.redirect('./user_list');
    });
};