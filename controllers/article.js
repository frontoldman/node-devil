/**
 * Created by zhangran on 14-8-16.
 */

var Article = require('../proxy').Article;

exports.add = function(req,res,next){
    var title = req.param('title');
    var content = req.param('content');
    var userId = req.session.user._id;

    //console.log(req.session.user);
    //console.log(userId);

    Article.add(title,content,userId,function(err,article){

        if(err){
            res.redirect('/article_add');
            return;
        }

        res.redirect('/');

    });
}