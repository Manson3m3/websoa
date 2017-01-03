/**
 * Created by Administrator on 2016/12/31.
 */
var sys = require('util');
var  mysql=require('mysql');
console.log('正在连接MySQL...');


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

function insertUser(client,account,password,callback){
    client.query('insert into USER valuse(?,?)'[account,password],function(err,results){
        if(err){
            console.log("err"+err.message);
            return err;
        }
        callback(results);
    })
}

function queryUser(client,account,callback){
    client.query('select * from USER where ACCOUNT ="'+account+'"',function(err,results){
        if (err){
            console.log("err"+err.message);
            return err;
        }
        callback(results);
    })
}

function modifyPw(client,account,newPassword,callback){
    client.query('update USER set PASSWORD = ? where account = ?'[newPassword,account],function(err,results){
        if (err){
            console.log("update err"+err.message);
            return;
        }
        callback(results);
    })
}


//yzc's
function querySinger(client,singer,callback){
    client.query('select * from SONG where SINGER like ' + "'%" + singer + "%'",function(err,results){
        if (err){
            console.log("err"+err.message);
            return err;
        }
        //if (results[0] != undefined)
            callback(results);
    })
}

function querySong(client,song,callback){
    client.query('select * from SONG where NAME like ' + "'%" + song + "%'",function(err,results){
        if (err){
            console.log("err"+err.message);
            return err;
        }
        //if (results[0] != undefined)
            callback(results);
    })
}

function getSongMaxID(client,callback){
    client.query('select max(SONG_ID) as temp from SONG',function(err,results){
        if (err){
            console.log('GetData Error+'+err.message);
            return err;
        }
        callback(results[0].temp);
    })
}

function insertSong(client, maxID, name, artist, file_link, pic, lrc){
    client.query('insert into SONG(SONG_ID,NAME,SINGER,COLLECTION,DOWNLOAD,PICTURE,LYRICS) values(' + maxID + ',' + name + ',' + artist + ',0,' + file_link + ',' + pic + ',' + lrc + ')',function(err,results){
        if(err){
            console.log("err"+err.message);
            return err;
        }
    })
}


exports.querySinger = querySinger;
exports.querySong = querySong;
exports.getSongMaxID = getSongMaxID;
exports.insertSong = insertSong;

exports.connect = connect;
exports.listUsers = listUsers;
exports.insertUser = insertUser;
exports.queryUser = queryUser;
exports.modifyPw = modifyPw;
//var sys = require("util");
//sys.puts("Server running at http://localhost:8033/");