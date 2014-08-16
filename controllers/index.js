/**
 * Created by zhangran on 14-8-16.
 */
var Article = require('../proxy').Article;

exports.index = function(req,res,next){
    Article.findAll(function(err,articleList){
        if(err){
            res.send('读取文章列表状态失败！');
            return;
        }
        res.render('index',{
            title:'首页',
            articleList:articleList
        });
    });
};