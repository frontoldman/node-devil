/**
 * Created by zhangran on 14-9-14.
 */

var Article = require('../proxy/article');

var http = require('http');


getData('http://cnodejs.org/?page=4', function (html) {
    //console.log(html);
    var regx = /<a\s+class='topic_title'\s+href='(.*?)'/g;

    var match;

    while (match = regx.exec(html)) {

        if (match.length >= 2) {
            var url = 'http://cnodejs.org' + match[1];
            console.log(url);
            getData(url, function (html) {
                // console.log(html);

                var htmlRegx = /<span\s+class="topic_full_title">([^<>]*)<\/span>/i;

                var title = htmlRegx.exec(html);

                var contentRegx = /<div\s+class='topic_content'>\s*<div\s*class="markdown-text">(.*?)<\/div>\s*<\/div>/i;

                var content = contentRegx.exec(html);

                if (title && title.length >= 2 && content && content.length >= 2) {
                    console.log(title[1]);
                    console.log(content[1]);
                    Article.add(title[1], content[1], '5402fddf43cc659dec000001', function () {
                        //process.exit();
                    });
                }

            })
        }
    }

    //process.exit();
});

function getData(url, callback) {

    http.get(url, function (res) {
        var size = 0;
        var chunks = [];
        res.on('data', function (chunk) {
            size += chunk.length;
            chunks.push(chunk);
        });
        res.on('end', function () {
            var data = Buffer.concat(chunks, size);
            var html = data.toString();
            html = html.replace(/([\n\r])(\s)*/ig, '');
            callback(html);
        });

    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    });

}