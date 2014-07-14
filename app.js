/**
 * Created by zhangran on 14-7-12.
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Loader = require('Loader');

var config = require('./config');
var routes = require('./routes');
var models = require('./models/');

var app = express();

//path是一个转换的路径的工具包，有一系列的方法
app.set('views' , path.join(__dirname,'views'));    //设置试图路径
app.set('view engine','html');  //设置模版引擎
app.engine('html',require('ejs-mate')); //html映射到ejs,html后缀默认使用ejs渲染

//表单参数解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//静态文件路由
//app.use(Loader.less(__dirname));
app.use(express.static(path.join(__dirname,'/public')));

routes(app);

app.listen(config.port,function(){
    console.log('Your app is listening on %d in %s mode!', config.port , '' );
});

module.exports = app;
