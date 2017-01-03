/**
 * Created by Administrator on 2017/1/2.
 */
var express = require('express');
var router = express.Router();
var usr = require('../connectDB_houli.js');

//register
/*router.route('reg').get(function(req,res){
    res.render('reg',{title:'ע��'});
}).post*/

router.get('/register',function(req,res){
    res.render('register',{title:'register'});
})
router.post('/register',function(req,res,next){
            client = usr.connect();
            result = null;
            usr.queryUser(client,req.body.username,function(result){
                if(result[0] == undefined){
                    usr.insertUser(client,req.body.username,req.body.upwd,function(result){
                        if(result == true)
                        {
                            console.log('zhucechenggong');
                            res.send("注册成功");
                            //res.redirect('/login');
                        }
                        else{
                            res.send("注册失败");
                        }
                    })
                }else{
            res.send("账号已注册");
            //setTimeout("window.location.reload()",2000);
        }

    })
})

module.exports = router;