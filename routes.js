/**
 * Created by zhangran on 14-7-12.
 */
var user = require('./controllers/user');
var article = require('./controllers/article');
var index = require('./controllers/index');
var middlewear = require('./middlewear/index');
var authChecker = middlewear.authChecker;
var addUser = middlewear.addUser;

module.exports = function (app) {


    app.get('/', addUser);
    app.get('/', index.index);


    /*
     ==================================================
     关于用户的路由start
     ==================================================
     */
    app.get('/user_add', function (req, res, next) {
        res.render('user/user_add', {
            name: null,
            errMsg: {},
            title: '用户注册'
        });
    });

    app.post('/user_add', user.add);

    app.get('/user_list', authChecker, user.list);

    app.get('/user_login', function (req, res, next) {
        res.render('user/user_login', {
            name: null,
            errMsg: {},
            title: '登录'
        });
    });

    app.post('/user_login', user.login);

    app.get('/user_login_out', user.loginOut);

    /*
     ==================================================
     关于用户的路由end
     ==================================================
     */

    /*
     ==================================================
     关于文章的路由start
     ==================================================
     */
    app.get('/article_add', authChecker, function (req, res, next) {
        res.render('article/article_add', {
            title: '文章发表'
        });
    });

    app.post('/article_add', authChecker, article.add);

    app.get('/article/:id', addUser, article.findOne);

    app.post('/add_comment', authChecker, article.addComment);

    app.get('/get_page_article', article.pageFind);

    app.get('/article_count', article.count);

    app.get('/article_page/:pageIndex', addUser, article.getPage);

    /*
     ==================================================
     关于文章的路由end
     ==================================================
     */

    app.get('/404', addUser, function (req, res) {
        res.render('404', {
            title: '404页面',
            url: req.param('url')
        });
    });

    app.use(function (req, res) {
        res.redirect('/404?url=' + req.originalUrl);
    });


};