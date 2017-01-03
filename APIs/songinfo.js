var express = require('express');
var router = express.Router();
var  mysql = require('mysql');

router.get('/songinfo/songid=:songid', function(req, res) {
    var client = mysql.createConnection({'host':'123.206.187.211','port':3306,'user':'fred','password':'2016websoa'});
    client.query('use 2016websoa');
    //var data = '{ "data":'
    client.query(
        'select * from SONG where SONG_ID = ' + req.params.songid,
        //+ 'COMMENT.SONG_ID as a join USER a.USER_ID = USER.USER_ID order by RANKING',
        function selectCb(error, results, fields) {
            if (error) {
                console.log('GetData Error: ' + error.message);
                client.end();
                return;
            }
            var song = { id: results[0]['SONG_ID'], picture: results[0]['PICTURE'], name: results[0]['NAME'], singer: results[0]['SINGER'], lyrics: results[0]['LYRICS'], download: results[0]['DOWNLOAD'] };
            res.json(song);
        }
    );
});

module.exports = router;
