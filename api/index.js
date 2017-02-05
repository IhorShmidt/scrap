'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({version: 'v1'});
});

router.use('/getNews', require('./getNews'));
router.use('/grabNews', require('./grabNews'));

module.exports = router;