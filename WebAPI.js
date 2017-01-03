/**
 * Created by yzc on 2017/1/3.
 */
var http = require('http');
var usr = require('../web_soa/connectDB_yzc')

function url_encode(url){
    url = encodeURIComponent(url);
    url = url.replace(/\%3A/g, ":");
    url = url.replace(/\%2F/g, "/");
    url = url.replace(/\%3F/g, "?");
    url = url.replace(/\%3D/g, "=");
    url = url.replace(/\%26/g, "&");

    return url;
}


function insertSong(search){
    var client = usr.connect();
    var urlAPI = "http://tingapi.ting.baidu.com/v1/restserver/ting?from=webapp_music&size=20&method=baidu.ting.search.catalogSug&format=json&callback=&query="+search+"&_=1413017198449";
    http.get(url_encode(urlAPI), function (res) {
        var size = 0;
        var chunks = [];
        //console.log(urlAPI);
        res.on('data', function (chunk) {
            size += chunk.length;
            chunks.push(chunk);
        });
        res.on('end', function () {
            var data = Buffer.concat(chunks, size);
            var str = data.toString();
            var par = JSON.stringify(str);
            par = JSON.parse(par);
            par = eval(par);
            insert(function(result){
                var cnt = 0;
                var maxID = result;
                while (cnt < par.song.length)
                {
                    maxID++;
                    var name = "'" + par.song[cnt].songname + "'";
                    var artist = "'" + par.song[cnt].artistname + "'";
                    var songid = par.song[cnt].songid;
                    getInfo(maxID,name,artist,songid);
                    //usr.insertSong(client,maxID,name,artist);

                    cnt++;
                }
            });
            console.log(par.song.length);
        });
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    });
}

function insert(callback) {
    var client = usr.connect();
    //result = null;
    usr.getSongMaxID(client,function(result){
        callback(result);
    });
}

function getInfo(maxID,name,artist,songid){
    var client = usr.connect();
    var urlAPI = "http://tingapi.ting.baidu.com/v1/restserver/ting?from=webapp_music&method=baidu.ting.song.play&songid=" + songid + "&format=json&callback=";
    http.get(url_encode(urlAPI), function (res) {
        var size = 0;
        var chunks = [];
        //console.log(urlAPI);
        res.on('data', function (chunk) {
            size += chunk.length;
            chunks.push(chunk);
        });
        res.on('end', function () {
            var data = Buffer.concat(chunks, size);
            var str = data.toString();
            var par = JSON.stringify(str);
            par = JSON.parse(par);
            par = eval(par);
            var file_link = "'" + par.bitrate.file_link + "'";
            var pic = "'" + par.songinfo.pic_premium + "'";
            var lrc = "'" + par.songinfo.lrclink + "'";
            usr.insertSong(client, maxID, name, artist, file_link, pic, lrc);
            console.log(maxID+" "+name+" "+artist+" "+file_link+" "+pic+" "+lrc);
        });
        //console.log(par.song.length);
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    });
}
function parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');

        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
}

exports.url_encode = url_encode;
exports.insertSong = insertSong;
exports.parseLyric = parseLyric;