/**
 * Created by yzc on 2017/1/2.
 */
var express = require('express');
var router = express.Router();
var usr = require('../connectDB.js');
var webApi = require('../WebAPI.js');
/* GET home page. */
router.get('/search', function(req, res) {

    client = usr.connect();
    result = null;
    //var search = "安静";
	var type = req.body.name;// Song  Airtist
	var search =req.body.info;
    usr.querySinger(client,search,function(result){
        if (result[0] == undefined) {
            webApi.insertSong(search);
            usr.querySinger(client,search,function(result){
                if (result[0] == undefined) {
                    res.send("找不到结果！");
                }
                else
                    res.send(JSON.stringify(result));
            });
        }
        else
            res.send(JSON.stringify(result));
    });
    //res.render('index', { title: 'Express' });


});

module.exports = router;
