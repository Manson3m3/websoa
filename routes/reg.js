/**
 * Created by Administrator on 2017/1/2.
 */
var express = require('express');
var router = express.Router();
var usr = require('../connectDB.js');

//register
/*router.route('reg').get(function(req,res){
    res.render('reg',{title:'注册'});
}).post*/
router.get('/reg',function(req,res){
    res.render('register',{title:'register'});
})
router.post('/reg',function(req,res,next){
            client = usr.connect();
            result = null;
            usr.queryUser(client,req.body.uemail,function(result){
                if(result[0] == undefined){
                    usr.insertUser(client,req.body.uemail,req.body.upwd,function(err){
                        if(err) throw err;
                        res.send("注册成功");
                    })
                }else{
            res.send('该账号已经注册');
            setTimeout("window.location.reload()",2000);
        }

    })
})

module.exports = router;