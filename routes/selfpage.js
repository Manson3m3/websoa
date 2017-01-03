/**
 * Created by Administrator on 2017/1/2.
 */
var express = require('express');
var router = express.Router();
var usr = require('../connectDB_houli.js');


router.get('/selfpage',function(req,res){
    res.render('selfpage',{username:user_name});
    /*usr.listUserSong(client,user_id,function(result){
        res.render('selfpage')
    });*/
})

router.post('/ChangePass',function(req,res){
    client = usr.connect();
    result = null;
    var user = req.session.username;
    usr.queryUser(client,user_name,function(result){
        if(req.body.oldPass == result[0].PASSWORD)
        {
            client = usr.connect();
            temp = null;
            usr.modifyPw(client,user,req.body.newPass,function(temp){
                if(temp == true){
                    res.send("modify password succeed");
                }
            })
        }
        else{
            res.send("modify failed");
        }
    })
})
module.exports = router;