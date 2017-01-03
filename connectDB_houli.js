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
    client.query('select max(USER_ID) as temp from USER',function(err,results,fields){
        if(err){
            console.log("err"+err.message);
            return err;
        }
        callback(results);
    })
}

function insertUser(client,username,password,callback){

    getCurrentID(client,function(result) {
        var userID = result[0].temp;
        userID = Number(userID) +1;
        client.query('insert into USER values(?,?,?)', [userID, username,password], function (err, results) {
            if (err) {
                console.log("err" + err.message);
                return err;
            }
            else{
                var isSucceess = true;
                results = isSucceess;
                callback(results);
            }
        })
    })
}

function queryUser(client,username,callback){
    client.query('select * from USER where username ="'+username+'"',function(err,results){
        if (err){
            console.log("err"+err.message);
            return err;
        }
        //console.log(results[0].PASSWORD);
        callback(results);
    })
}
function modifyPw(client,username,newPassword,callback){
    client.query('update USER set PASSWORD = ? where USERNAME = ?',[newPassword,username],function(err,results){
        if (err){
            console.log("update err"+err.message);
            return err;
        }else {
            var haveModified = true;
            results = haveModified;
            callback(results);
        }
    })
}

function listSongID(client,userID,callback){
    client.query('select SONG_ID from USER_SONG where USER_ID = ?',[userID],function(err,results){
        if(err){
            console.log('err'+err.message);
            return err;
        }
        callback(results);
    })
}
function listUserSong(client,userID,callback){
    listSongID(client,userID,function(result){
        var len = result.length;
        var songID = [len];
        //var songName = [len];
        for(var i = 0;i<len;i++) {
            songID[i] = result[i].SONG_ID;
            function sss(songID)
            {
                client.query('select NAME from SONG where SONG_ID = ?', [songID], function (err, results) {
                    if (err) {
                        console.log('err' + err.message);
                        return err;
                    }
                    callback(songID + '\0\0\0' + results[0].NAME);

                })
            }
            sss(songID[i]);
        }
        })
}
console.log('succeed');

exports.listSongID = listSongID;
exports.connect = connect;
exports.listUsers = listUsers;
exports.insertUser = insertUser;
exports.queryUser = queryUser;
exports.modifyPw = modifyPw;
exports.getCurrentID = getCurrentID;
exports.listUserSong = listUserSong;
//var sys = require("util");
//sys.puts("Server running at http://localhost:8033/");