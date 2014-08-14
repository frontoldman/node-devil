/**
 * Created by zhangran on 14-7-12.
 */
var user = require('./controllers/user');
var middlewear = require('./middlewear/index');
var authChecker = middlewear.authChecker;

module.exports = function(app){

    app.get('/',authChecker,function(req,res,next){
        res.render('index',{
            title:'首页'
        });
    });

    /*
    ==================================================
    关于用户的路由start
    ==================================================
     */
    app.get('/user_add',function(req,res,next){
        res.render('user/user_add',{
            name:null,
            errMsg:{},
            title:'用户注册'
        });
    });

    app.post('/user_add',user.add);

    app.get('/user_list',authChecker,user.list);

    app.get('/user_login',function(req,res,next){
       res.render('user/user_login',{
           name:null,
           errMsg:{},
           title:'登录'
       });
    });

    app.post('/user_login',user.login);

    app.get('/user_login_out',user.loginOut);
    /*
     ==================================================
     关于用户的路由end
     ==================================================
     */



};