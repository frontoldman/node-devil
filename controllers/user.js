/**
 * Created by zhangran on 14-7-13.
 */
var crypto = require('crypto');

var User = require('../proxy').User;

exports.list = function(req,res,next){
    User.findAll(function(err,users){
        if(err){
            console.log(err);
            return;
        }
        res.render('./user/user_list',{
            userList:users,
            title:'用户列表'
        })
    });
};

exports.add = function(req,res,next){

    var name = req.param('name'),
        password = req.param('password'),
        passwordRepeat = req.param('password-repeat'),
        email = req.param('email')
        age = req.param('age');

    var errorMsg = {};
    var errorFlag = false;
    if(!name.length){
        errorMsg.name = '用户名不能为空';
        errorFlag = true;
    }

    if(!password || !passwordRepeat){
        errorMsg.password = '密码和重复密码不能为空';
        errorFlag = true;
    }

    if(password != passwordRepeat){
        errorMsg.password = '两次输入的密码必须一致';
        errorFlag = true;
    }

    if(email.length && !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)){
        errorMsg.email = '邮箱格式不正确';
        errorFlag = true;
    }

    if(age.length && isNaN(age)){
        errorMsg.age = '年龄必须是数字';
        errorFlag = true;
    }

    if(errorFlag){
        res.render('./user/user_add',{
            errMsg:errorMsg,
            title:'添加用户'
        });
        return;
    }

    var md5 = crypto.createHash('md5');

    password = md5.update(password).digest('hex');

    User.newAndSave(name,password,email,age,function(err){
        if(err){
            return next(err);
        }
        res.redirect('./user_list');
    });
};

exports.login = function(req,res,next){
    //res.locals.name = null;
    var name = req.param('name'),
        password = req.param('password');

    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    User.findOne({name:name,password:password},function(err,user){
        if(err){
            res.redirect('/login');
            return;
        }

        var time = 1000*60*60*24;

        res.cookie('id',user.id,{ expires: new Date(Date.now() + time)});
       // res.cookie('name',user.name,{ expires: new Date(Date.now() + time)});
       // res.cookie('password',user.password,{ expires: new Date(Date.now() + time)});
//        req.session.user = user;
//        res.locals.name = user.name;

        res.redirect('/');
    });
};

exports.loginOut = function(req,res,next){
    req.session.user = null;
    res.cookie('id','',{expires:0});
    res.redirect('./user_login');
}