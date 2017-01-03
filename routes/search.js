/**
 * Created by yzc on 2017/1/2.
 */
var express = require('express');
var router = express.Router();
var webApi = require('../WebAPI.js');
var http = require('http');
global.info=[];
/* GET home page. */
router.get('/test', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    //var supplies={"Songlist":[{"name":1,"age":1},{"name":2,"age":2}]};
    res.render('test');
});
router.post('/search', function(req, res) {
    var type = req.body.name;// Song  Airtist
    var search =req.body.info;
    if (type == 'Song') {
        console.log("begin");
        urlAPI = "http://localhost:3000/searchsong/songname=" + search;
        console.log(urlAPI);
        http.get(webApi.url_encode(urlAPI), function (result) {
            //console.log(result.toString());

            result.on('data', function (data) {
                console.log(data.toString());
                info=JSON.parse(data.toString());
                res.send(data.toString());
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });
    }
    else
        if (type == 'Airtist'){
            urlAPI = "http://localhost:3000/searchsinger/singer=" + search;
            http.get(webApi.url_encode(urlAPI), function (result) {

                result.on('data', function (data) {
                    console.log(data.toString());
                    res.send(data.toString());
                    info=JSON.parse(data.toString());
                });
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });
        }

});

router.get('/results', function(req, res) {
    setTimeout(function(){
        res.render('results',{Result:info});
    },1000);
});

module.exports = router;
