/**
 * Created by Administrator on 2016/12/29.
 */
var express = require('express');
var router = express.Router();
var usr = require('../connectDB_houli.js');

router.get('/login',function(req,res){
    res.render('login',{title:'login'});
})

router.post('/login',function(req,res){
    console.log("post succeed");
    client = usr.connect();
    result = null;
    usr.queryUser(client,req.body.username,function(result){
        if(result[0] == undefined){
            res.send('该用户不存在');
        }else{
            req.session.userName = req.body.username;
            res.cookie('userName',req.body.name,{
                maxAge:1000*2000,httpOnly:true
            })
            if(result[0].PASSWORD == req.body.upwd){
                res.send('登录成功');
                res.redirect('/register');
            }else{
                res.send("密码输入错误");
                setTimeout("redirect('/login')",2000);
            }
        }
    })
})
//logout
router.post('/logout',function(req,res){
    res.redirect('/login');
})
router.post('/toRegister',function(req,res){
    //res.redirect('/register');
    res.render("register");
})


module.exports = router;