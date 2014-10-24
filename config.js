/**
 * Created by zhangran on 14-7-12.
 */
var config = {
    port:80,
    //db:'mongodb://127.0.0.1/dbtest',
    db:'mongodb://zrlakey:694790191p@kahana.mongohq.com:10056/merry_xmas',
    db_name: 'merry_xmas',
    session_secret:'zr',
    upload_path:'./uploads',
    log_path:'./logs/'
};

module.exports = config;
module.exports.config = config;