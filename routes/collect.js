var express = require('express');
var router = express.Router();
var  mysql = require('mysql');

router.get('/collect/songid=:songid&userid=:userid', function(req, res) {
    var client = mysql.createConnection({'host':'123.206.187.211','port':3306,'user':'fred','password':'2016websoa'});
    client.query('use zyftest');
    var  collectAddSql = 'INSERT INTO USER_SONG (SONG_ID, USER_ID) VALUES(?,?)';
    var collectAddSql_Params = [req.params.songid, req.params.userid];
    client.query(collectAddSql,collectAddSql_Params,function (error, result) {
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