var express = require('express');
var http = require('http');
var router = express.Router();
var  mysql = require('mysql');
global.varA=[];
global.varB=[];

/* GET home page. */
router.get('/homepage', function(req, res) {
    http.get("http://localhost:3000/api/ranklist", function(apires) {
        apires.on('data', function(data1){
            //res.send(data);
            //varA = data1;
            varA=JSON.parse(data1.toString());
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
    res.render('homepage',{rankList:varA,recommendList:varB});
});
module.exports = router;

router.post('/play', function(req, res) {
    //req.body.info=1;
    console.log(req.body.info);
    http.get("http://localhost:3000/api/songinfo/songid=" + req.body.info, function(apires) {
        apires.on('data', function(data1){
            //res.render('index', {data: (chunk)});
           // res.end()
           // res.send(data);
            varA=JSON.parse(data1.toString());
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    http.get("http://localhost:3000/api/comment/songid=" + req.body.info, function(apires) {
        apires.on('data', function(data2){
            //res.send(data);
            varB=JSON.parse(data2.toString());
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    console.log(varA.name);
    //res.render('play',{Song:varA,Comment:varB});
    setTimeout(function(){
        res.render('play',{Song:varA,Comment:varB});
    },3000);
});
router.get('/play', function(req, res) {
    setTimeout(function(){
        res.render('play',{Song:varA,Comment:varB});
    },1000);
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
router.post('/collect', function(req, res) {
    http.get("http://localhost:3333/api/collect/songid=" + req.body.songid + "&userid=" + req.body.userid, function(apires) {
        apires.on('data', function(data){
            res.send(data);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});
router.get('/collect', function(req, res) {
    res.render('index');
});

module.exports = router;
