/**
 * Created by zhangran on 14-7-13.
 */

var models = require('../models');
var User = models.User;

//查询所有用户
exports.findAll = function (callback) {
    User.find(callback);
};

//新增一个用户
exports.newAndSave = function (name, password, pic, email, age, callback) {

    var user = new User();
    user.name = name;
    user.password = password;
    user.pic = pic;
    user.email = email;
    user.age = age;
    user.save(callback);
};


exports.findOne = function (userObj, callback) {
    User.findOne(userObj, callback);
};

exports.findById = function (id, callback) {
    User.findOne({_id: id}, callback);
};