/**
 * Created by zhangran on 14-7-12.
 */
var user = require('./controllers/user');

module.exports = function(app){

    app.get('/',function(req,res,next){
        res.render('index',{
            title:'首页',
            name:req.cookies.name
        })
    });

    /*
    ==================================================
    关于用户的路由start
    ==================================================
     */
    app.get('/user_add',function(req,res,next){
        res.render('user/user_add',{
            errMsg:{},
            title:'用户注册'
        });
    });

    app.post('/user_add',user.add);

    app.get('/user_list',user.list);

    app.get('/user_login',function(req,res,next){
       res.render('user/user_login',{
           errMsg:{},
           title:'登录'
       });
    });

    app.post('/user_login',user.login);
    /*
     ==================================================
     关于用户的路由end
     ==================================================
     */



};