/**
 * Created by yzc on 2017/1/3.
 */
var express = require('express');
var router = express.Router();
var usr = require('../connectDB_yzc.js');
var webApi = require('../WebAPI.js');
/* GET restful API. */
router.get('/searchsong/songname=:id', function(req, res) {
    //res.render('test');
    client = usr.connect();
    result = null;
    var search = req.params.id;
    console.log(search);
    usr.querySong(client, search, function (result) {
        if (result[0] == undefined) {
            webApi.insertSong(search);
            setTimeout(function(){
                usr.querySong(client, search, function (result1) {
                    //console.log(result1);
                    //result1 = {result1};
                    //var temp = JSON.stringify(result1);
                    if (result1[0] == undefined)
                        result1 = ["error"];
                    var songlist = result1;
                    console.log(songlist);
                    res.send(songlist);
                });
            },2000);
        }
        else{
            //result = {result};
            //var temp = JSON.stringify(result1);
            var songlist = result;
            //var temp = JSON.stringify(result);
            //var songlist = {"\"songlist\"" : temp};
            //console.log(songlist);
            res.send(songlist);
        }
            //callback(JSON.stringify(result));
            //res.render(JSON.stringify(result));
        //console.log(JSON.stringify(result));
    });
});

router.get('/searchsinger/singer=:id', function(req, res) {
    //res.render('test');
    client = usr.connect();
    result = null;
    var search = req.params.id;
    console.log(search);
    usr.querySinger(client, search, function (result) {
        //console.log(result[0]);
        if (result[0] == undefined) {
            webApi.insertSong(search);
            setTimeout(function(){
                usr.querySinger(client, search, function (result1) {
                    //console.log(result1);
                    //var temp = JSON.stringify(result1);
                    if (result1[0] == undefined)
                        result1 = ["error"];
                    var singerlist = result1;
                    res.send(singerlist);
                });
            },2000);
        }
        else {
            //ar temp = JSON.stringify(result);
            var singerlist = result;
            res.send(singerlist);
        }
        //callback(JSON.stringify(result));
        //res.render(JSON.stringify(result));
        //console.log(JSON.stringify(result));
    });


});


module.exports = router;
