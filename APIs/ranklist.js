var express = require('express');
var router = express.Router();
var  mysql = require('mysql');

/* GET home page. */
router.get('/ranklist', function(req, res) {
    var client = mysql.createConnection({
        'host': '123.206.187.211',
        'port': 3306,
        'user': 'fred',
        'password': '2016websoa'
    });
    client.query('use 2016websoa');
    client.query(
        'select * from SONG order by COLLECTION DESC',
        function selectCb(error, results, fields) {
            if (error) {
                console.log('GetData Error: ' + error.message);
                client.end();
                return;
            }
            var data = []
            for (var i = 0; i < 10; i++) {
                data.push({ id: results[i]['SONG_ID'], name: results[i]['NAME'], singer: results[i]['SINGER'] });
            }
            res.json(data);
        }
    );
    client.end();
});
module.exports = router;

