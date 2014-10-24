/**
 * Created by zhangran on 14-8-16.
 */
var Article = require('../proxy').Article;
var markdown = require('markdown').markdown;
var EventProxy = require('eventproxy');

exports.index = function (req, res, next) {

    var pageNum = 10;

    function render(articleList, count) {
        res.render('index', {
            title: '首页',
            articleList: articleList,
            pageCount: Math.ceil(count / pageNum),
            current: 1
        });
    }

    var proxy = new EventProxy();
    proxy.all('get-article', 'get-count', render);

    Article.pageFind(1, pageNum, function (err, articleList) {
        if (err) {
            proxy.emit('get-article', []);
            return;
        }

        articleList.forEach(function (article) {
            var postTime = article.postTime;
            article.postTimeString = postTime.getFullYear() + ' - '
                + postTime.getMonth() + ' - ' + postTime.getDate();

        });

        proxy.emit('get-article', articleList);
    });

    Article.count(function (err, count) {
        if (err) {
            proxy.emit('get-count', 0);
            return;
        }
        proxy.emit('get-count', count);
    });


};