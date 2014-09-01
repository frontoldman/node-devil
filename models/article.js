/**
 * Created by zhangran on 14-8-14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title:{type:String},
    content:{type:String},
    userId:{type:String},
    postTime:{type:Date},
    updateTime:{type:Date},
    visitTimes:{type:Number},
    replayList:{type:Array}
});

mongoose.model('Article',ArticleSchema);