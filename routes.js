/**
 * Created by zhangran on 14-7-12.
 */


module.exports = function(app){

    app.get('/',function(req,res,next){
        res.send('index');
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

    app.post('/user_add',require('./controllers/user').add);

    app.get('/user_list',require('./controllers/user').list);

    app.get('/user_login',function(req,res,next){
       res.render('user/login',{
           errMsg:{},
           title:'登录'
       });
    });
    /*
     ==================================================
     关于用户的路由end
     ==================================================
     */



};