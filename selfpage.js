/**
 * Created by Administrator on 2017/1/2.
 */
var express = require('express');
var router = express.Router();
var usr = require('../connectDB.js');


router.get('/selfpage',function(req,res){
    res.render('selfpage',{title:'selfpage'});
})






router.post('/login',function(req,res){
    client = usr.connect();
    result = null;
    usr.queryUser(client,CURRENTUSER,function(result){
        if(req.body.oldPass == result[0].password)
        {
            client = usr.connect();
            temp = null;
            usr.modifyPw(client,CURRENTUSER,req.body.newPass,function(temp){
                res.send(temp);
            })
        }
        else{
            res.send("请输入正确的原密码")
        }
    })
})
module.exports = router;