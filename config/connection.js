'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const env = process.env.NODE_ENV || 'local';
const _config = require('./config.json')[env];

module.exports.connect = (cb) => {
  return mongoose.connect(_config.database, cb);
};

module.exports.disconnect = () => {
  return mongoose.disconnect();
};

module.exports.getMongoose = () => {
  this.disconnect();
  this.connect(() => console.log('Db connected successfully'));
  return mongoose;
};
