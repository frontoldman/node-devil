/**
 * Created by zhangran on 14-8-16.
 */

var models = require('../models');
var Article = models.Article;

//查询所有文章
exports.findAll = function (callback) {
    Article.find(callback);
};

exports.findOne = function (articleObj, callback) {
    Article.findOne(articleObj, callback);
};

exports.add = function (title, content, userId, callback) {

    var article = new Article();

    article.title = title;
    article.content = content;
    article.userId = userId;
    article.postTime = new Date();
    article.updateTime = new Date();
    article.visitTimes = 0;
    article.save(callback);

};

exports.update = function (conditions, update, options, callback) {

    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    Article.update(conditions, update, options, callback);
};

exports.count = function (callback) {
    Article.count({}, callback);
};

//分页查询
exports.pageFind = function (pageCurrent, pageSize, callback) {
    var skip = (pageCurrent - 1) * pageSize;
    var limit = pageSize;

    Article.where()
        .skip(skip)
        .limit(limit)
        .exec(callback);


};
