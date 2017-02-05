const express = require('express'),
    request = require('request'),
    _ = require('lodash'),
    router = express.Router(),
    retry = require('bluebird-retry'),
    config = require('../config/config.json'),
    newsModel = require('../models/news.model');


router.get('/ver2', (req, res) => {
  let startPage = 1, maxPages = 100, allResult = [];

  retry(
      request(_getOptions(startPage), (error, response, body) => {
        startPage++;
        if (!error && body.tops.length && startPage <= maxPages) {
          const topsArray = _.map(body.tops, top => {
            return {postId: top.Id, url: top.Url, title: top.Title}
          });
          return _findOrCreate(topsArray);
        } else {
          return Promise.resolve('Done');
        }
      })
  )
      .then((result) => {
        res.status(200).send(result);
      });
});

router.get('/', (req, res) => {
  const startPage = 1, maxPages = 100;
  return Promise.resolve().then(() => {
    request(_getOptions(startPage), (error, response, body) => {
      if (!error && body.tops.length && startPage <= maxPages) {
        const topsArray = _.map(body.tops, top => {
          return {postId: top.Id, url: top.Url, title: top.Title}
        });
        return newsModel.create(topsArray);
      } else {
        return Promise.resolve('Done');
      }
    })
  }).then((result) => {
    console.log(' in result', result);
    res.status(200).send(result);
  })
});

function _getOptions(page) {
  let url = `https://www.ukr.net/news/dat/sport/${page}/`;
  return {method: 'get', json: true, url: url, gzip: true, headers: config.headers};
}


module.exports = router;
