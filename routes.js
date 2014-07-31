/**
 * Created by zhangran on 14-7-12.
 */


module.exports = function(app){

    app.get('/',function(req,res,next){
        res.send('index');
    });

    app.get('/user_add',function(req,res,next){
        res.render('user_add');
    });

    app.post('/user_add',require('./controllers/user').add);

    app.get('/user_list',require('./controllers/user').list);

};