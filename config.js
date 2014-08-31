/**
 * Created by zhangran on 14-7-12.
 */
var config = {
    port:7777,
    db:'mongodb://127.0.0.1/dbtest',
    db_name: 'dbtest',
    session_secret:'zr',
    upload_path:'./uploads'
};

module.exports = config;
module.exports.config = config;