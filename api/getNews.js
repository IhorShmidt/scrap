const express = require('express'),
    router = express.Router(),
    newsModel = require('../models/news.model');

router.get('/', (req, res) => {
  newsModel.find({}).sort({createdAt: 1})
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
});

module.exports = router;