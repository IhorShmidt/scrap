const express = require('express'),
    request = require('request'),
    _ = require('lodash'),
    router = express.Router(),
    config = require('../config/config.json'),
    newsModel = require('../models/news.model');

router.get('/', (req, res) => {
  const startPage = 4;
  return new Promise((resolve, reject) => {
    return request(_getOptions(startPage), (error, response, body) => {
      if (!error && body.tops.length) {
        const topsArray = _.map(body.tops, top => {
          return {postId: top.Id, url: top.Url, title: top.Title}
        });
        resolve(topsArray);
      } else {
        return res.status(401).json(new Error('No new data'));
      }
    });
  })
      .then(_createIfNotExist)
      .then((result) => {
        if (result && result.length)
          res.status(200).send(result);
        return res.status(401).json(new Error('No new data'));
      });
});

function _getOptions(page) {
  let url = `https://www.ukr.net/news/dat/sport/${page}/`;
  return {method: 'get', json: true, url: url, gzip: true, headers: config.headers};
}

function _createIfNotExist(topsArray) {
  return newsModel.find({}).then((existingTops) => {
    return topsArray.filter((newTop) => {
      return !existingTops.some((existingTop) => existingTop.postId == newTop.postId);
    });
  })
      .then((uniqueValues) => {
        return newsModel.create(uniqueValues);
      });
}

module.exports = router;