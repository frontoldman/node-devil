/**
 * Created by zhangran on 14-7-12.
 */
require('./user');
require('./article');

var mongoose = require('mongoose');
var config = require('../config');

//连接数据库
mongoose.connect(config.db, function (err) {
    if (err) {
        console.err('connect to s% error:', config.db, err.message);
        process.exit(1);
    }
    console.log(config.db);
});



exports.User = mongoose.model('User');
exports.Article = mongoose.model('Article');




