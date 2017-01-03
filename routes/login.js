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

            if(result[0].PASSWORD == req.body.upwd){
                usr.queryUser(client,req.body.username,function(result){
                    console.log(".."+result[0].USER_ID);
                    user_id= result[0].USER_ID;
                    console.log(".."+user_id);
                })
                user_name = req.body.username;
                console.log("user_id="+user_id);
                console.log("dengluchenggong");
                setTimeout(function(){
                    console.log("user_id="+user_id);
                    res.send('登录成功');
                },1000);
                //res.redirect('/register');
            }else{
                res.send("密码输入错误");
                //setTimeout("redirect('/login')",2000);
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