/**
 * Created by zhangran on 14-7-12.
 */

var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var MongoStore = require('connect-mongo')(session);
var morgan = require('morgan');
var fs = require('fs');

var config = require('./config');
var routes = require('./routes');

var app = express();

//path是一个转换的路径的工具包，有一系列的方法
app.set('views', path.join(__dirname, 'views'));    //设置视图路径
app.set('view engine', 'ejs');

//表单参数解析
app.use(morgan('default', {
    stream: {
        write: function (line) {
            fs.appendFile(config.log_path + '/log.log', line, function () {
            });
        }
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer({dest: config.upload_path}));

app.use(require('cookie-parser')(config.session_secret));
app.use(session({
    secret: config.session_secret,
    key: 'sid',
//    store: new MongoStore({
//        db: config.db_name
//    }),
    resave: true,
    saveUninitialized: true
}));

//静态文件路由
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, config.upload_path)));

routes(app);

app.listen(config.port, function () {
    console.log('Your app is listening on %d in %s mode!', config.port, '');
});


module.exports = app;
