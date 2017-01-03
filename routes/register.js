/**
 * Created by Administrator on 2017/1/2.
 */
var express = require('express');
var router = express.Router();
var usr = require('../connectDB_houli.js');

//register
/*router.route('reg').get(function(req,res){
    res.render('reg',{title:'×¢²á'});
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
                            res.send("×¢²á³É¹¦");
                            res.redirect('/login');
                        }
                        else{
                            res.send("×¢²áÊ§°Ü");
                        }
                    })
                }else{
            res.send('¸ÃÕËºÅÒÑ¾­×¢²á');
            //setTimeout("window.location.reload()",2000);
        }

    })
})

module.exports = router;