/**
 * Created by zhangran on 14-8-16.
 */
var EventProxy = require('eventproxy');
var markdown = require('markdown').markdown;

var Article = require('../proxy').Article;
var User = require('../proxy').User;


exports.add = function (req, res, next) {
    var title = req.param('title');
    var content = markdown.toHTML(req.param('content'));
    var userId = req.session.user._id;

    Article.add(title, content, userId, function (err, article) {

        if (err) {
            res.redirect('/article_add');
            return;
        }
        res.redirect('/');
    });

};

exports.findOne = function (req, res, next) {
    var id = req.param('id');

    var render = function (article, user, replayList) {

        res.render('article/article_detail', {
            title: article.title,
            article: article,
            replayList: replayList,
            user: user
        });
    };

    var proxy = new EventProxy();
    proxy.all('get-article', 'get-user', 'get-replay-user', render);

    proxy.fail(next);

    proxy.once('get-article', function (article) {
        User.findOne({_id: article.userId}, function (err, user) {
            proxy.emit('get-user', user);
        });
    });


    Article.findOne({_id: id}, function (err, article) {

        var visitTimes = article.visitTimes + 1;
        article.visitTimes = visitTimes;

        var replayList = article.replayList;

        var size = 0;

        if (!replayList || replayList.length == size) {
            proxy.emit('get-replay-user', []);
        } else {
            replayList.forEach(function (replay) {
                User.findOne({_id: replay.userId}, function (err, user) {
                    size++;
                    if (err) {
                        replayList.userName = '没有读取到';
                        return;
                    }

                    replay.userName = user.name;
                    replay.userImg = user.pic;
                    replay.formatTimer = formatTimer(replay.time);
                    if (size == replayList.length) {
                        proxy.emit('get-replay-user', replayList);
                    }
                });
            });
        }


        Article.update({_id: id}, {visitTimes: visitTimes}, {multi: true}, function (err, newArticle) {
            // article.content = markdown.toHTML(article.content);
            var time = formatTimer(article.postTime);
            article.formatTimer = time;
            proxy.emit('get-article', article);
        });
    });
};

exports.addComment = function (req, res, next) {
    var articleId = req.param('article-id');
    var content = req.param('content');

    Article.findOne({_id: articleId}, function (err, article) {
        if (err) {
            next();
            return;
        }

        var replayList = article.replayList;

        if (!replayList) {
            replayList = [];
        }

        replayList.push({
            userId: req.cookies.id,
            content: content,
            time: new Date()
        });

        Article.update({_id: articleId}, {replayList: replayList}, {multi: true}, function (err, newArticle) {
            if (err) {
                next();
                return;
            }
            res.redirect('/article/' + articleId);
        });

    });

};

exports.getPage = function (req, res, next) {

    var pageIndex = req.param('pageIndex');

    var pageNum = 10;

    function render(articleList, count) {
        res.render('index', {
            title: '博客第' + pageIndex + '页',
            articleList: articleList,
            pageCount: Math.ceil(count / pageNum),
            current: pageIndex
        });
    }

    var proxy = new EventProxy();
    proxy.all('get-article', 'get-count', render);

    Article.pageFind(pageIndex, pageNum, function (err, articleList) {
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

exports.pageFind = function (req, res) {
    Article.pageFind(function (err, articleList) {
        res.json(articleList);
    });
};

exports.count = function (req, res) {
    Article.count(function (err, count) {
        res.send(count + '');
    });
};

function formatTimer(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}