/**
 * Created by Administrator on 2016/12/29.
 */
var express = require('express');
var router = express.Router();
var usr = require('../connectDB.js');


router.get('/login',function(req,res){
    res.render('login',{title:'login'});
})

router.post('/login',function(req,res){
    console.log("post succeed");
    client = usr.connect();
    result = null;
    usr.queryUser(client,req.body.uemail,function(result){
        if(result[0] == undefined){
            res.send('该用户不存在');
        }else{
            if(result[0].password == req.body.upwd){
                //s.redirect('/homepage');
				res.send('success');
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



module.exports = router;