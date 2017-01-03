var express = require('express');
var router = express.Router();
var  mysql = require('mysql');

router.get('/addcomment/content=:content&songid=:songid&userid=:userid', function(req, res) {
    var client = mysql.createConnection({'host':'123.206.187.211','port':3306,'user':'fred','password':'2016websoa'});
    client.query('use zyftest');
    var  commentAddSql = 'INSERT INTO COMMENT(COMMENT_ID, CONTENT, TIME, SONG_ID, USER_ID) VALUES(0,?,?,?,?)';
    var date = new Date();
    var time = date.toLocaleString();
    var commentAddSql_Params = [req.params.content, time, req.params.songid, req.params.userid];
    //var commentAddSql_Params = ['hehe', time, 1, 1];
    client.query(commentAddSql,commentAddSql_Params,function (error, result) {
            if (error) {
                console.log('ADDData Error: ' + error.message);
                client.end();
                return;
            }
        }
    );
    client.end();
    res.send("success");
});
module.exports = router;
