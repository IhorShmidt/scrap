'use strict';

const express = require('express');
const app = express();
const config2 = require('./config/config2');
const request = require('request');

// Routing
app.use('/api', require('./api/'));

// db connection and settings
const connection = require('./config/connection');
connection.getMongoose();


// create server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening at:', port);
});

function meow() {}

function _getOptions(maxID) {
    let url = `https://i.instagram.com/api/v1/feed/saved/?max_id=${maxID}`;
    return {method: 'get', json: true, url: url, gzip: true, headers: config2.headers};
}


function agon(nextMaxId) {
    const firstMaxId = `AQATJ0eIRvie9-nMjEB0ZBNFzv5o0vOFyjEbSv72ovzdE8OFmNN78c_TNiXTuoOJSGMIofECH4BfmQiLqf5T8WDGQ--DuDweR-Vhq8DNr6Ycsw&`;
    return request(_getOptions(nextMaxId || firstMaxId), (error, response, body) => {
        if (!error) {
            console.log('------=-=-=-=-=-=-=--=--------');
            console.log(body);
            console.log('------=-=-=-=-=-=-=--=--------');
            console.log(
                'END OF REQUEST'
            );

            return agon(body.next_max_id);
        } else {
            console.log(error);
        }
    });
}

agon();

module.exports = app;