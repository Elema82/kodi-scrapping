const getScript = (id, url) => {
    return new Promise((resolve, reject) => {
        const http      = require('http'),
              https     = require('https');

        let client = http;

        // console.log(url);

        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        client.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {

                const getUrls = require('get-urls');
                let urls = getUrls(data);
                let i = 1;
                urls.forEach((value) => {
                    if (i === urls.size) {
                        resolve("UPDATE source_channels SET player_url = \""+ value +"\" WHERE id = " + id);
                    }
                    i = i + 1;
                });
            });

            resolve();

        }).on("error", (err) => {

            reject(new Error("Can't open url1"));
        }).on('unhandledRejection', (reason, promise) => {
            reject(new Error("Can't open url2"));

            // console.log('Unhandled Rejection at:', reason.stack || reason)
            // Recommended: send the information to sentry.io
            // or whatever crash reporting service you use
        });
    });
};


var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "kodi"
});

con.connect(function(err) {
    if (err) throw err;

    var sql = "SELECT id, target_url FROM source_channels";
    con.query(sql, function (err, sourceChannels) {
        if (err) throw err;

        var record = 0;
        sourceChannels.forEach(channel => {
            (async (id, url) => {
                try {
                    var updateSql = await getScript(id, url);
                } catch (e) {
                    console.log(e);
                }

                if (length(updateSql) > 0) {
                    con.query(updateSql, function (err, result) {
                        if (err) throw err;
                        record = record + 1;
                    });
                }

            })(channel.id, channel.target_url);
        });

        console.log(record + " record(s) updated");
    });
});




/*
Base url: http://photocall.tv
    Fixes:
        - Baseurl para los SourcesChannels
        - Baseurl para los Imagenes

 */

// https://rtve-la2-vod-dash.secure.footprint.net/live/nas_live/la2/dash/la2.mpd?begin=&end=&hash=08e939b53f1480a972adeca5dd0d0e36e655fed6c%27%2C&nva=1587848900&nvb=1587848890
// https://rtve-la2-vod-dash.secure.footprint.net/live/nas_live/la2/dash/la2.mpd?begin=&end=&nvb=1587844864&nva=1587844874&hash=089b943a9390c9987d959a7103590792156bf4187