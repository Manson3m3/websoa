var express = require('express');
var http = require('http');
var router = express.Router();
var  mysql = require('mysql');
global.varA=[];
global.varB=[];
/* GET home page. */
router.get('/ranklist', function(req, res) {
    http.get("http://localhost:3000/api/ranklist", function(apires) {
        apires.on('data', function(data1){
            //res.send(data);
            varA = data1;
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    http.get("http://localhost:3000/api/recommendlist", function(apires) {
        apires.on('data', function(data2){
            //res.send(data);
            //varB =data2.toString();
            varB=JSON.parse(data2.toString());
            console.log(varB[0]);
            console.log("ok1");
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    //varB=JSON.parse();
    console.log(varB);
    res.render('index',{title:varA,title1:varB});
});
module.exports = router;

router.post('/songinfo', function(req, res) {
    http.get("http://localhost:3000/api/songinfo/songid=" + req.body.info, function(apires) {
        apires.on('data', function(data){
            //res.render('index', {data: (chunk)});
           // res.end()
            res.send(data);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});
router.get('/songinfo', function(req, res) {
    res.render('index');
});
module.exports = router;

router.post('/comment', function(req, res) {
    http.get("http://localhost:3333/api/comment/songid=" + req.body.info, function(apires) {
        apires.on('data', function(data){
            res.send(data);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});
router.get('/comment', function(req, res) {
    res.render('index');
});
module.exports = router;

router.post('/addcomment', function(req, res) {
    http.get("http://localhost:3000/api/addcomment/content=" + req.body.content + "&songid=" + req.body.songid + "&userid=" + req.body.userid, function(apires) {
        apires.on('data', function(data){
            res.send(data);
        });
    }).on('error', function(e) {
            console.log("Got error: " + e.message);
    });
});
module.exports = router;
