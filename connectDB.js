/**
 * Created by Administrator on 2016/12/31.
 */
var sys = require('util');
var  mysql=require('mysql');
console.log('正在连接MySQL...');
var http = require("http");


function connect(){
    var client = mysql.createConnection({
            'host':'123.206.187.211',
            'port':3306,
            'user':'fred',
            'password':'2016websoa'
    });
    client.connect();
    client.query('use 2016websoa');
    return  client;
}

function listUsers(client,callback){
    client.query('select * from USER',function(err,results,fields){
        if (err){
            console.log('GetData Error+'+err.message);
            return err;
        }
        callback(results);
    })
}

function getCurrentID(client,callback){
    client.query('select max(USER_ID as temp from USER',function(err,results,fields){
        if(err){
            console.log("err"+err.message);
            return err;
        }
        callback(results);
    })
}

function insertUser(client,username,password,callback){
   //var  a = 0;
    var currentID = client.query('select max(USER_ID) as temp from USER',function(err,results,fields){
        if(err){
            console.log("err"+err.message);
            return err;
        }
        //results = results[0].temp;
        //console.log(results);
        return results;
    });
   /* var  currentID = getCurrentID(client,function(result){

    });

*/
   /* for(var i = 0;i < 2;i++){
        console.log(currentID.data[i].temp+"\n");
    }
    //var temp = currentID[];
   // currentID = JSON.stringify(currentID);
    console.log("currentID="+currentID);*/

    var userID = 10;
    client.query('insert into USER values(?,?,?)',[userID,username,password],function(err,results){
        if(err){
            console.log("err"+err.message);
            return err;
        }
        callback(results);
    })
}

function queryUser(client,username,callback){
    client.query('select * from USER where username ="'+username+'"',function(err,results){
        if (err){
            console.log("err"+err.message);
            return err;
        }
        callback(results);
    })
}

function modifyPw(client,username,newPassword,callback){
    client.query('update USER set PASSWORD = ? where USERNAME = ?',[newPassword,username],function(err,results){
        if (err){
            console.log("update err"+err.message);
            return;
        }
        callback(results);
    })
}


console.log('succeed');

exports.connect = connect;
exports.listUsers = listUsers;
exports.insertUser = insertUser;
exports.queryUser = queryUser;
exports.modifyPw = modifyPw;
//var sys = require("util");
//sys.puts("Server running at http://localhost:8033/");