/**
 * Created by zhangran on 14-8-11.
 */

var models = require('../models');
var User = models.User;

exports.validateLogin = function(req,res,next){

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


}