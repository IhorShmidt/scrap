'use strict';

const express = require('express');
const app = express();

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

module.exports = app;