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
        res.render('user_add',{
            errMsg:errorMsg
        });
        return;
    }



    User.newAndSave(name,password,email,age,function(err){
        if(err){
            return next(err);
        }
        res.redirect('./user_list');
    });
};