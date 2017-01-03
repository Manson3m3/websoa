var express = require('express');
var router = express.Router();
var  mysql = require('mysql');

/* GET home page. */
router.get('/recommendlist', function(req, res) {
    var client = mysql.createConnection({
        'host': '123.206.187.211',
        'port': 3306,
        'user': 'fred',
        'password': '2016websoa'
    });
    client.query('use zyftest');
    client.query(
        'SELECT * FROM SONG WHERE SONG_ID >= ((SELECT MAX(SONG_ID) FROM SONG)-(SELECT MIN(SONG_ID) FROM SONG)) * RAND() + (SELECT MIN(SONG_ID) FROM SONG) LIMIT 5',
        function selectCb(error, results, fields) {
            if (error) {
                console.log('GetData Error: ' + error.message);
                client.end();
                return;
            }
            var data = []
            for (var i = 0; i < results.length; i++) {
                data.push({ rank: results[i]['RANKING'], id: results[i]['SONG_ID'], name: results[i]['NAME'], singer: results[i]['SINGER'] });
            }
            res.json(data);
        }
    );
    client.end();
});
module.exports = router;

