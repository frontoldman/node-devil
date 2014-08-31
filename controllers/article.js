/**
 * Created by zhangran on 14-8-16.
 */
var EventProxy = require('eventProxy');
var markdown = require('markdown').markdown;

var Article = require('../proxy').Article;
var User = require('../proxy').User;


exports.add = function(req,res,next){
    var title = req.param('title');
    var content = req.param('content');
    var userId = req.session.user._id;



    Article.add(title,content,userId,function(err,article){

        if(err){
            res.redirect('/article_add');
            return;
        }

        res.redirect('/');

    });

};

exports.findOne = function(req,res,next){
    var id = req.param('id');

    var render = function(article,user){
        res.render('article/article_detail',{
            title:article.title,
            article:article,
            user:user
        });
    };

    var proxy = new EventProxy();
    proxy.all('get-article','get-user',render);

    proxy.fail(next);

    proxy.once('get-article',function(article){
        User.findOne({_id:article.userId},function(err,user){
            proxy.emit('get-user',user);
        });
    });


    Article.findOne({_id:id},function(err,article){

        var visitTimes = article[0].visitTimes + 1;

        article[0].visitTimes = visitTimes;

        Article.update({_id:id},{visitTimes:visitTimes},{multi: true},function(err,newArticle){

        });

        article[0].content = markdown.toHTML(article[0].content);

        proxy.emit('get-article',article[0]);
    });




};