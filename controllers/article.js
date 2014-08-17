/**
 * Created by zhangran on 14-8-16.
 */
var EventProxy = require('eventProxy');

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
    Article.findOne({_id:id},function(err,article){
        if(err){
            next();
            return;
        };

        var visitTimes = article[0].visitTimes + 1;

        article[0].visitTimes = visitTimes;

        Article.update({_id:id},{visitTimes:visitTimes},{multi: true},function(err,newArticle){

        });

        User.findOne({_id:article[0].userId},function(err,user){
            res.render('article/article_detail',{
                title:article[0].title,
                article:article[0],
                user:user.name
            });
        });

    });
};