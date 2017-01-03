var express = require('express');
var router = express.Router();
var  mysql = require('mysql');

router.get('/comment/songid=:songid', function(req, res) {
    var client = mysql.createConnection({'host':'123.206.187.211','port':3306,'user':'fred','password':'2016websoa'});
    client.query('use 2016websoa');
    client.query(
        'select * from COMMENT join USER on COMMENT.USER_ID = USER.USER_ID where SONG_ID = ' + req.params.songid,
        function selectCb(error, results, fields) {
            if (error) {
                console.log('GetData Error: ' + error.message);
                client.end();
                return;
            }
            var data = []
            for (var i = 0; i < results.length; i++) {
                data.push({ content: results[i]['CONTENT'], time: results[i]['TIME'], account: results[i]['ACCOUNT'] });
            }
            res.json(data);
        }
    );
    client.end();
});
module.exports = router;
