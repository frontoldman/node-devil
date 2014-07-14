/**
 * Created by zhangran on 14-7-13.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:{type:String},
    password:{type:String},
    email:{type:String},
    age:{type:Number}
});

mongoose.model('User',UserSchema);